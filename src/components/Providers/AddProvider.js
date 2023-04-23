import React, {useState } from "react";
////////////////////////////////////////////////////

import {useAuth} from '../../Context/authContext'
import {getFirestore, collection} from 'firebase/firestore';
import {postFirestore} from '../../Firebase/ApiFunctions'
////////////////////////////////////////////////////
import Icon from '@mdi/react';
import { mdiContentSave } from '@mdi/js';
import { mdiArrowLeft }from '@mdi/js';
import { useNavigate } from 'react-router';
import {alertConfirmacion} from '../Reusables/Alerts'
const inconColor =("rgb(52, 51, 72)")

export default function AddProvider() {
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
    const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/providers")
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
    navigate("/providers")
  }

  const agregar = () => {
    if(!editable.identifier){return false}
    postClient(editable)
    navigate('/providers')
    return true
  }
  return (
    <div className='container-MenuProductos'>
    <div className='imgBackGroundCustom'></div>
          <div className='container-nav-MenuProductos'>
              <div className='button-Container-MenuProductos'>
                  <button className='button-MenuProductos' onClick={() => navigate(-1)}>    
                      <Icon path={mdiArrowLeft} size={2} color={inconColor} />   
                  </button>
              </div>
              <div className='button-Container-MenuProductos'>
                  <button className='button-MenuProductos'  onClick={()=>alertConfirmacion("Agregar Provedor?",null,agregar,"Complete los campos")}>    
                      <Icon path={mdiContentSave} size={2} color='#1a6b91' />   
                      <p className='text-button-MenuProductos'>Agregar</p> 
                  </button>
              </div>
          </div>
       <div className='container-AddClient'>
         <div className="container2-AddClient">
         {/* {modalSalir&&<Modal cnavigation={navigation}stateModal={setModalSalir}/>} */}
              <p className = 'textTitle-AddClient'>Provedor: {editable.identifier}</p>

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
            </div>
      </div>
      </div>
  )
}



