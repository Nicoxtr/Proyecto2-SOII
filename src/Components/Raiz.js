import React, { useState,useEffect } from 'react'
import app from '../Theme/app.css'
import carpetaIcon from '../assets/img/carpetaIcon.png'
import Modal from './Modal'
import Modal2 from './Modal2'
const Raiz = ({
    nUsuario,arregloUsuarios,setArregloUsuarios,
    memoria,setMemoria,
    memoria2,setMemoria2,
    mode,setMode,
    nBloques,setNBloques,
    espacios,setEspacios,
    espacios2,setEspacios2,
    proceso,setProceso,
    listaArchivos, setListaArchivos,
    tamanioXbloque,setTamanioXbloque,
}) => {
  console.log('esta es nuestra lista de archivos: ',listaArchivos)
  const [posicionFocus,setPosicionFocus]=useState(0);
  const [carpetaFocus,setCarpetaFocus]=useState(arregloUsuarios['arregloFicheros'][posicionFocus]);
  const [textoCarpeta,setTextoCarpeta]=useState('');
  useEffect(() => {
    //setCarpetaFocus(arregloUsuarios['arregloFicheros'][posicionFocus]);
    console.log('Estamos en: ',carpetaFocus);
    console.log('contenido de carpetas',carpetaFocus)
  }, [posicionFocus,<Raiz/>])

  useEffect(() => {
    setCarpetaFocus(arregloUsuarios['arregloFicheros'][posicionFocus]);
  }, [posicionFocus])
  

  useEffect(() => {
    buscaEspacios();
    buscaEspacios2();
    if(nBloques>0){
      setTamanioXbloque(Math.ceil(40/nBloques));
      creaMemoria2();
    }
  },[memoria,nBloques,tamanioXbloque])
  useEffect(() => {
    buscaEspacios2();
  }, [memoria2])


  const agregaProceso=()=>{
    buscaEspacios()
    llenaMemoriaPorByte();
    setListaArchivos([...listaArchivos,proceso]);
    //console.log("se ha agregado un proceso con exito");  
    setProceso({nombre:"",tamanio:""})
  }
  const llenaMemoriaPorByte=()=>{
      const arregloAux=memoria.map((bit,index)=>{
        for(let i=0;i<proceso.tamanio;i++){
            if(espacios[i]===index){
              return{
                ...bit,
                contenido:proceso.nombre
              }
            }
        }
      return bit;
    });
      setMemoria(arregloAux);
  }
  const buscaEspacios=()=>{
    const arregloAux=memoria.map((bit,index)=>{
        if(bit.contenido===""){
          return index
        }  
    });
    const arregloAux2=arregloAux.filter((espacio)=>espacio!==undefined);
    setEspacios(arregloAux2);
  }

  const buscaEspacios2=()=>{
    const arregloAux=memoria2.map((bit,index)=>{
        if(bit.contenido===""){
          return index
        }  
    });
    const arregloAux2=arregloAux.filter((espacio)=>espacio!==undefined);
    setEspacios2(arregloAux2);
  }

  const eliminaArchivo=(archivo)=>{
    //limpiamos la memoria de nuestro espacio
    //console.log("este es el archivo a eliminar",archivo);
    const arregloAux=memoria2.map((bit,index)=>{
        if(archivo===bit.contenido){
            //console.log("El archivo se encontro en las siguientes posiciones,:",index);
            return{
                ...bit,
                contenido:""
            }
        }
        return bit;
    });
    //Eliminamos el proceso de nuestro registro de procesos
    const arregloAux2=listaArchivos.filter((p)=>{
       return p.nombre!==archivo;
    });
    //seteamos estados
  setListaArchivos(arregloAux2);
  setMemoria(arregloAux);
  }
  const creaMemoria2=()=>{
    const arregloAux = memoria.map((bit,index)=>{
      if(index<tamanioXbloque){
        //console.log("index: ",index,"tamanioxbloque: ",tamanioXbloque);
        //console.log(bit)
        return(bit);
      }      
    })
    const arregloAux2 = arregloAux.filter((bit)=> bit!==undefined)
    //console.log("Asi queda la memoria aux: ",arregloAux2);
    setMemoria2(arregloAux2);
  }
  const agregaArchivoXbloque=(proceso)=>{
    console.log("Este archivo se va agregar: ",proceso);
    let cantidadBloques=proceso.tamanio/nBloques
    console.log("El proceso ocupa bloques: ",cantidadBloques);
    const arregloAux=memoria2.map((bit,index)=>{
      for(let i=0;i<cantidadBloques;i++){
          if(espacios2[i]===index){
            return{
              ...bit,
              contenido:proceso.nombre
            }
          }
      }
    return bit;
    });
    setMemoria2(arregloAux);
    setListaArchivos([...listaArchivos,proceso]);
    //console.log("se ha agregado un proceso con exito");  
    setProceso({nombre:"",tamanio:""})
  }
  
  const irRaiz=()=>{
    setCarpetaFocus(arregloUsuarios['arregloFicheros'][0]);
    setPosicionFocus(0);
  }
  const bajarCarpeta=()=>{
    if(posicionFocus<arregloUsuarios['arregloFicheros'].length-1){
      if(posicionFocus+1===1){
        setPosicionFocus(posicionFocus+3)  
      }else{
        setPosicionFocus(posicionFocus+1)
      }
      
    }
  }
  const subirCarpeta=()=>{
    if(posicionFocus>0){
      if(posicionFocus-1===2){
        setPosicionFocus(posicionFocus-3)  
      }else{
        setPosicionFocus(posicionFocus-1)
      }
    }
  }
  const cambiaFocus=(carpeta)=>{
    let nombre=carpeta.nombre;
    let indice=0;
    console.log('Vamos a entrar a esta carpeta: ',carpeta);
    let rutaActual=arregloUsuarios['arregloFicheros'][posicionFocus];
    rutaActual['carpetas'].map((carpeta,index)=>{
      console.log(carpeta.nombre);
      if(carpeta.nombre===nombre){
        console.log('carpeta encontrada');
        setCarpetaFocus(carpeta)
      }
    });

    console.log(carpetaFocus);
  }

  const deleteArchivoXCarpeta=(nombre)=>{
    console.log('Este archivo lo vamos a eliminar: ',nombre);
    console.log(typeof(carpetaFocus['carpetas']));
    const nuevoArray = carpetaFocus['carpetas'].filter((archivo)=> archivo.nombre!==nombre );
    carpetaFocus['carpetas']=nuevoArray;
    eliminaArchivo(nombre)
    alert('Eliminamos un archivo');
  }
  const buscaCarpeta=()=>{
    console.log('Vamos a buscar esta carpeta: ',textoCarpeta);
    console.log("Esto tenemos en arregloUsuarios",arregloUsuarios['arregloFicheros']);
    arregloUsuarios['arregloFicheros'].map((fichero)=>{
      if(fichero.nombre===textoCarpeta){
        console.log('Encontramos la carpeta!!');
        setCarpetaFocus(fichero);
      }
    })
  }
  

  return (
    <div className='container'>
        <h1>Path: {carpetaFocus.nombre}</h1>
        <hr></hr>
        <div className='container'>
            <div className='container' style={{justifyContent:'space-between',display:'flex'}}>
                <Modal carpetaFocus={carpetaFocus['carpetas']} agregaArchivoXbloque={agregaArchivoXbloque} />
                <br/>
                <Modal2 carpetaFocus={carpetaFocus['carpetas']}/>
                <form className="d-flex">
                  <input className="form-control me-2" type="search" onChange={(e)=>{setTextoCarpeta(e.target.value)}}/>
                  <button className="btn btn-outline-success" type="button" onClick={()=>{buscaCarpeta()}}>Buscar</button>
                </form>
                <input type='button' className='btn3' onClick={()=>bajarCarpeta()}/>
                <input type='button' className='btn2' onClick={()=>subirCarpeta()}/>
                <input type='button' className='btn4' onClick={()=>irRaiz()}/>    
            </div>
            <hr/>
              {carpetaFocus.carpetas.length>0
              ?<>
                {carpetaFocus.carpetas.map((archivo)=>(
                  
                <div className='container' style={{display:'flex'}}>
                  {archivo['carpetas']
                  ?<h5>Directorio:{archivo.nombre} <button type="button" className="btn btn-info" onClick={()=>{cambiaFocus(archivo)}} >entrar</button></h5>
                  
                  :<h5>Archivo:{archivo.nombre} |<span> tamanio:{archivo.tamanio}</span> |<span>ubicacion: {carpetaFocus.nombre}</span> </h5>}
                  <button type="button" className="btn btn-danger" onClick={()=>{deleteArchivoXCarpeta(archivo.nombre)}}>X</button>
                </div>
                ))}
              </>
              :<h3>No tenemos nada</h3>
              }
            <hr/>
        </div>
    </div>
  ) 
}

export default Raiz