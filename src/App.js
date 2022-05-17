import React,{useState,useEffect} from 'react'
import {mapa} from "./ArregloMapa"
import { usuarios } from './users';
import TipoAlmacenamiento from './Components/TipoAlmacenamiento'
import Login from './Components/Login'
import Raiz from './Components/Raiz';

const App = () => {
  /***Estados del tipo de almacenamiento*/
  const [memoria,setMemoria]=useState(mapa);
  const [memoria2,setMemoria2]=useState([]);
  const [mode,setMode]=useState("");
  const [nBloques,setNBloques]=useState(0);
  const [espacios,setEspacios]=useState([]);
  const [espacios2,setEspacios2]=useState([]);
  const [proceso,setProceso]=useState({
    nombre:"",
    tamanio:0
  });
  const [listaArchivos, setListaArchivos]=useState([]);
  const [tamanioXbloque,setTamanioXbloque]=useState(0);
  /*Estados de login*/
  const [login,setLogin]=useState(false);
  const [usuarioEnCurso,setUsuarioEnCurso]=useState(0);
  
  /*Estados del manejo de archivos por rutas*/
  const [arregloUsuarios,setArregloUsuarios]=useState(usuarios);

  useEffect(() => {
    
  }, [arregloUsuarios,<Raiz/>])
  
  
  console.log("Este es nuestro usuario:",usuarioEnCurso);
  return (
    <div className='container'>
        <TipoAlmacenamiento
          memoria={memoria} setMemoria={setMemoria}
          memoria2={memoria2} setMemoria2={setMemoria2}
          mode={mode} setMode={setMode}
          nBloques={nBloques} setNBloques={setNBloques}
          espacios={espacios} setEspacios={setEspacios}
          espacios2={espacios2} setEspacios2={setEspacios2}
          proceso={proceso} setProceso={setProceso}
          listaArchivos={listaArchivos} setListaArchivos={setListaArchivos}
          tamanioXbloque={tamanioXbloque} setTamanioXbloque={setTamanioXbloque}

          login={login} setLogin={setLogin}
        />
        <hr/>
        {!login
        ?<Login
          login={login} setLogin={setLogin}
          usuarioEnCurso={usuarioEnCurso} setUsuarioEnCurso={setUsuarioEnCurso}
          />
        :<Raiz 
          login={login} setLogin={setLogin}
          nUsuario={usuarioEnCurso}
          arregloUsuarios={arregloUsuarios[usuarioEnCurso]} setArregloUsuarios={setArregloUsuarios}

          memoria={memoria} setMemoria={setMemoria}
          memoria2={memoria2} setMemoria2={setMemoria2}
          mode={mode} setMode={setMode}
          nBloques={nBloques} setNBloques={setNBloques}
          espacios={espacios} setEspacios={setEspacios}
          espacios2={espacios2} setEspacios2={setEspacios2}
          proceso={proceso} setProceso={setProceso}
          listaArchivos={listaArchivos} setListaArchivos={setListaArchivos}
          tamanioXbloque={tamanioXbloque} setTamanioXbloque={setTamanioXbloque}

        />}
        <hr/>

        
    </div>
  )
}

export default App