import React, { useState } from 'react'
import { usuarios } from '../users'

const Login = ({login,setLogin,focoRaiz,setFocoRaiz,setUsuarioEnCurso}) => {
  const [arrelgoUsuarios,setArregloUsuarios]=useState(usuarios);
  const [usuarioAux,setUsuarioAux]=useState({
      nombre:"",
      psw:""
  });
  console.log(usuarioAux);
  
  const handleLogin=()=>{
    let encontrado=false;
    arrelgoUsuarios.map((usuario,index)=>{
        if(usuario.nombre===usuarioAux.nombre && usuario.psw===usuarioAux.psw){
            console.log('bienvenido,',index);
            encontrado=true;
            setLogin(true);
            setUsuarioEnCurso(index);
            return usuario;
        }
    });
    if(!encontrado){
        alert('datos incorrecto, intente de nuevo');
        setUsuarioAux({
            nombre:"",
            psw:""
        });
    }
    
  }
  return (
    <div className='container'>
        <h4>Login</h4>
        <form className='row'>
            <div className="form-floating mb-3 col">
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="usuario5"
                    onChange={(e)=>setUsuarioAux({...usuarioAux,nombre:e.target.value})}
                    />
                <label htmlFor="floatingInput">Nombre de usuario</label>
            </div>
            <div className="form-floating col">
                <input 
                    type="password" 
                    className="form-control" 
                    id="floatingPassword" 
                    placeholder="Password"
                    onChange={(e)=>setUsuarioAux({...usuarioAux,psw:e.target.value})}
                    />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            
        </form>
        <button type="button" className="btn btn-primary" onClick={()=>{handleLogin()}}>Acceder</button>
    </div>
  )
}

export default Login