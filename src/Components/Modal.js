import React, { useState } from 'react'

const Modal = ({carpetaFocus,agregaArchivoXbloque}) => {
    console.log('Estamos en modal1 :',carpetaFocus);
    const [archivoAux,setArchivoAux]=useState({
        nombre:'',
        tamanio:0,
        
    });
    
    console.log('Esto lleva nuestro archivoAux',archivoAux);
    
    const addArchivoXCarpeta=()=>{
        console.log('Este archivo lo vamos a agregar: ',archivoAux);
        agregaArchivoXbloque(archivoAux);
        carpetaFocus.push(archivoAux)
    }
    return (
    <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
         Nuevo Archivo
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Cracion de Archivo</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
                        <label>Nombre del archivo </label>
                        <input 
                          type="text"
                          onChange={(e)=>{setArchivoAux({...archivoAux,nombre:e.target.value})}}
                        />
                        <br/>
                        <br/>
                        <label>Tamanio del archivo </label>
                        <input 
                          type="number"
                          onChange={(e)=>{setArchivoAux({...archivoAux,tamanio:parseInt(e.target.value)})}}
                          />
                      </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" className="btn btn-primary" onClick={()=>addArchivoXCarpeta()} data-bs-dismiss="modal">Guardar</button>
            </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default Modal