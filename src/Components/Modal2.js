import React,{useState} from 'react'

const Modal2 = ({carpetaFocus}) => {
    console.log('Estamos en modal2!!: ',carpetaFocus);
    const [nuevaCarpeta,setNuevaCarpeta]=useState(
        {
            nombre:'',
            carpetas:[]
        }
    )
    const addCarpeta=()=>{
        console.log('Esta va a ser nuestra nueva carpeta,',nuevaCarpeta);
        carpetaFocus.push(nuevaCarpeta);
    }
    return (
        <>
            <button type="button" className="btn btn-warning " data-bs-toggle="modal" data-bs-target="#exampleModal2">
             NuevoDirectorio
            </button>
    
            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel2">Cracion de Directorio</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <label>Nombre del Directorio</label>
                        <input 
                            type="text"
                            onChange={(e)=>{setNuevaCarpeta({...nuevaCarpeta,nombre:(e.target.value)})}}
                        />
                        <br/>
                    </form>
                    </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" className="btn btn-primary" onClick={()=>addCarpeta()} data-bs-dismiss="modal" >Guardar</button>
                </div>
                </div>
            </div>
            </div>
        </>
      )
}

export default Modal2