import React from 'react'
import { useState,useEffect} from 'react';
import {mapa} from "../ArregloMapa"

function TipoAlmacenamiento({
    memoria,setMemoria,
    memoria2,setMemoria2,
    mode,setMode,
    nBloques,setNBloques,
    espacios,setEspacios,
    espacios2,setEspacios2,
    proceso,setProceso,
    listaArchivos, setListaArchivos,
    tamanioXbloque,setTamanioXbloque,
    login
}) {
  
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
  
  
  //console.log(mode);
  // console.log("Esta es tu memoria: ", memoria);
  // console.log("Este es tu lista de procesos actual: ",listaArchivos);
  // console.log("Estos son tus espacios disponibles",espacios);
  // console.log(espacios.length);
  console.log("Espacios2: ",espacios2);
  console.log("El tamanio por bloque sera: ",tamanioXbloque);
  console.log("Esta nuestra memoria 2: ",memoria2);
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
    const arregloAux=memoria.map((bit,index)=>{
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
  const agregaArchivoXbloque=()=>{
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

  return (
  <>
        <div className='container'>
          <h1>Memoria</h1>
          <table className="table table-bordered">
            <thead>
              <tr>
              {memoria2.map((bit,i)=>(
                <th key ={i} scope="col" >{bit.posicion}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
              {memoria2.map((bit,i)=>(
                <th key ={i} scope="col">{bit.contenido}</th>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      
      {/*------Formulario*/}
        <div className='container'> 
          <select className="form-select" defaultValue=""  onChange={(e)=>{setMode(e.target.value)}}>
            <option value="" disabled>--Selecione--</option>
            <option value="bloque">Por Bloque</option>
          </select>
          <div className='container'>
                  {nBloques===0 && mode==="bloque" ?  
                  <div>
                    <h2>Ingresa tamanio x bloque</h2>
                    <select className="form-select" defaultValue=""  onChange={(e)=>{setNBloques(parseInt(e.target.value))}}>
                      <option value="" disabled>--Selecione--</option>
                      <option value="2" >2</option>
                      <option value="3" >3</option>
                      <option value="4" >4</option>
                      <option value="5" >5</option>
                      <option value="6" >6</option>
                      <option value="7" >7</option>
                      <option value="8" >8</option>
                      <option value="9" >9</option>
                      <option value="10" >10</option>
                      <option value="11" >11</option>
                      <option value="12" >12</option>
                      <option value="13" >13</option>
                      <option value="14" >14</option>
                      <option value="15" >15</option>
                      <option value="16" >16</option>
                      <option value="17" >17</option>
                      <option value="18" >18</option>
                      <option value="19" >19</option>
                      <option value="20" >20</option>
                    </select>
                    <h4>Tamanio x Bloque: {nBloques}</h4>
                  </div>
                  :null
                  }
                  <h4>Tamanio x Bloque: {nBloques}</h4>
          </div>
        </div>
    </>
  );
}

export default TipoAlmacenamiento;
