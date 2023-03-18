import React, {useState } from "react";
////////////////////////////////////////////////////
import './AddClient.css'
import {useAuth} from '../../Context/authContext'
import {getFirestore, collection} from 'firebase/firestore';
import {postFirestore} from '../../Firebase/ApiFunctions'
import Modal from '../Reusables/Modal'
////////////////////////////////////////////////////
import Icon from '@mdi/react';
import { mdiContentSave } from '@mdi/js';
import { mdiArrowLeft }from '@mdi/js';
import { useNavigate } from 'react-router';
export default function AddClient() {
  const {userProfile} = useAuth()
  /////////////////////////////////////////////////
  const[editable,setEditable]= useState({
    identifier: "",
    phone: "",
    location: "",
  })
  const navigate = useNavigate()
  /////////////////////////////////////////////////
  const postClient = (data)=>{
    const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/customers")
    postFirestore(selectedCollection,data)
  }
  /////////////////////////////////////////////////
  const[modal,setModal]= useState(false)
  const[dato,setDato]= useState(false)
  const[modalSalir,setModalSalir]= useState(false)

  const handleChangeInput = (e)=>{
    setEditable({
      ...editable,
      [e.target.name]:e.target.value
    })
  }
  const salir = () => {
    navigate("/customers")
  }
  const eliminar = () => {
    console.log("eliminar")
    setModalSalir(true)
  }
  const agregar = () => {
    postClient(editable)
    console.log("agregar")
    alert("Cliente Agregado");
    console.log("Navigate MenuPrincipal")
  }
  return (
       <div className='container-AddClient'>
         <div className="container2-AddClient">
         {/* {modalSalir&&<Modal cnavigation={navigation}stateModal={setModalSalir}/>} */}
              <p className = 'textTitle-AddClient'>Cliente: {editable.identifier}</p>

            <div 
              className='containerIcon-AddClient'>       
              <p className = 'text-AddClient'> Nombre: </p>
              <input className='input-AddClient' placeholder="Escribe aqui" name="identifier" onChange={(e)=>handleChangeInput(e)} value={editable.identifier}/>
            </div>
           
            <div 
              className='containerIcon-AddClient'>     
              <p className = 'text-AddClient'> Telfono: </p>
              <input className='input-AddClient' placeholder="Escribe aqui" name="phone" onChange={(e)=>handleChangeInput(e)} value={editable.phone}/>
              </div>
            
            <div 
              className='containerIcon-AddClient'>     
              <p className = 'text-AddClient'> Ubicacion: </p>
              <input className='input-AddClient' placeholder="Escribe aqui" name="location" onChange={(e)=>handleChangeInput(e)} value={editable.location}/>
            </div>
          
          
            <div 
                className = 'containerNavBar-AddClient'>   
              <button
                  className='buttonNavBar-AddClient'
                  onClick={()=>salir()}
                ><Icon path={mdiArrowLeft} size={2} color='white'/><p className="textWhite">Salir</p></button>
              <button 
                  className='buttonNavBar-AddClient'
                  onClick={()=>agregar()}
                ><Icon path={mdiContentSave} size={2} color='white'/><p className="textWhite">Agregar</p></button>
            </div>
            </div>
      </div>
  )
}




  
