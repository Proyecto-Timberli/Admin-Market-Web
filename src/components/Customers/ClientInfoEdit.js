import React, {useState } from "react";
////////////////////////////////////////////////////
import './AddClient.css'
import {useAuth} from '../../Context/authContext'
import {getFirestore, doc} from 'firebase/firestore';
import {putFirestore, deleteFirestore} from '../../Firebase/ApiFunctions'
import {Modal} from '../Reusables/Modal'
////////////////////////////////////////////////////
import Icon from '@mdi/react';
import { mdiContentSave } from '@mdi/js';
import { mdiArrowLeft }from '@mdi/js';
import { useNavigate } from 'react-router';
import {useLocation} from 'react-router-dom';
import { mdiDeleteForever } from '@mdi/js';
export default function ClientInfoEdit() {
  const navigate = useNavigate()
  const locate = useLocation()
  const {id, identifier, phone, location} = locate.state
  const {userPermissions} = useAuth() 
  const {userProfile} = useAuth()
  /////////////////////////////////////////////////
  const[editable,setEditable]= useState({
    id:id,
    identifier: identifier,
    phone: phone,
    location: location,
  })
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  const putClient = (data)=>{
    const selected = doc(getFirestore(), "users/"+userProfile+"/customers", id)
    putFirestore(selected,data)
  }
  
  const deleteClient = ()=>{
    const selected = doc(getFirestore(), "users/"+userProfile+"/customers", id)
    deleteFirestore(selected)
  }

  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
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
    deleteClient()
    alert("Cliente Eliminado");
    navigate("/customers")
  }
  const guardar = () => {
    putClient(editable)
    console.log("guardar")
    alert("Cliente Actualizado");
  }
  return (
       <div className='container-AddClient'>
         <div className="container2-AddClient">
         {modalSalir&&<Modal functionCheckOk={eliminar}setStateModal={setModalSalir} mensaje={'Quiere eliminar este cliente?'}/>}
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
            <button 
              className="button2-AddClient"
              onClick={() => navigate("/sells",{state:id})}
            
            ><p className="textWhite">Historial de ventas</p></button>
            <button className="button2-AddClient"><p className="textWhite">Pedidos</p></button>
            <div 
                className = 'containerNavBar-AddClient'>   
              <button
                  className='buttonNavBar-AddClient'
                  onClick={()=>salir()}
                ><Icon path={mdiArrowLeft} size={2} color='black'/><p >Salir</p></button>
              <button
                  className='buttonNavBar-AddClient'
                  onClick={()=>setModalSalir(true)}
                ><Icon path={mdiDeleteForever} size={2} color='black'/><p >Eliminar</p></button>
              <button 
                  className='buttonNavBar-AddClient'
                  onClick={()=>guardar()}
                ><Icon path={mdiContentSave} size={2} color='black'/><p >Guardar</p></button>
            </div>
            </div>
      </div>
  )
}




  
