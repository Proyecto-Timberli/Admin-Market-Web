import './Agregar-uno.css'
import React, { useState } from 'react';
import {useAuth} from '../../Context/authContext'
import Icon from '@mdi/react';
import { mdiContentSave } from '@mdi/js';
import { mdiDeleteForever } from '@mdi/js';
import { mdiCheckboxMarked } from '@mdi/js';
import { mdiCloseBox } from '@mdi/js';
import { mdiArrowLeft } from '@mdi/js';
import {getFirestore, doc, } from 'firebase/firestore';
import {deleteFirestore,putFirestore} from '../../Firebase/ApiFunctions'
////////////////////////////////////////////////////

function ModalSalir({deleteFunction,stateModal}){
  function checkOk(){
    deleteFunction()
    alert("Producto Eliminado");
    stateModal(false)
  }
  function exit(){
    stateModal(false)
  }
  return (
    <div className='modalContainer-agregarUno'>
    <div className='modal'>
      <p>Desea eliminar el producto?</p>
      <div className='modalButtonsContainers'>
        <button onClick={()=>checkOk()}><Icon path={mdiCheckboxMarked} size={2} color="green"/></button> 
        <button onClick={()=>exit()}><Icon path={mdiCloseBox} size={2} color="red" /></button> 
      </div> 
    </div>
    </div>
  )
}


export default function EditInfo({params,visible}) {
  console.log("------------------------")
  console.log("AgregarUno")
  const {userProfile}= useAuth()
  /////////////////////////////////////////////////
  const {barCode, buyprice, category, description,id,image, make, name, price, stock} = params
  
  const[editable,setEditable]= useState({
    id:id,
    name: name?name:"",
    price: price?price:"",
    stock : stock?stock:"",
    category: category?category:"",
    make: make?make:"",
    buyprice: buyprice?buyprice:"",
    barCode: barCode?barCode:"",
    image: image?image:"", 
    description: description?description:""
  })
  const handleChangeInput = (e)=>{
    setEditable({
      ...editable,
      [e.target.name]:e.target.value
    })
  }
  const putProducts = (data)=>{
    const selected = doc(getFirestore(), "users/"+userProfile+"/products", data.id)
    putFirestore(selected,data)
  }
  
  const deleteProducts = ()=>{
    const selected = doc(getFirestore(), "users/"+userProfile+"/products", id)
    deleteFirestore(selected)
  }

  /////////////////////////////////////////////////
  const[modalSalir,setModalSalir]= useState(false)
  const[modal,setModal]= useState(false)
  const[dato,setDato]= useState(false)

  const back=()=>{
    visible(false)
  }
  const eliminar = () => {
    console.log("eliminar")
    setModalSalir(true)
  }
  const guardar = () => {
    putProducts(editable)
    alert("Producto Actualizado");
  }

  //////////////////////////////////////////////////////////
  //hacer global
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  console.log("------------------------")
  return (
    <div className='container-agregarUno'>
      <div className='containerColor-agregarUno'>
        {modalSalir&&<ModalSalir deleteFunction={deleteProducts} stateModal={setModalSalir}/>}
        <div className='containerBack-agregaruno'>
        <button
                className='buttonBack-agregarUno'
                onClick={()=>back()}
                ><Icon path={mdiArrowLeft} size={2} /></button>
          <h2 className='textTitle--agregarUno'>Informacion del Producto: {id}</h2>    
        </div>
        <div 
          className='cotainerIcon-agregarUno'>       
          <p className='text-agregarUno'>Nombre del producto: </p> 
          <input className='input-agregarUno' name="name" onChange={(e)=>handleChangeInput(e)} value={editable.name}/>
        </div>

        <div
          className='cotainerIcon-agregarUno'>      
          <p className='text-agregarUno'> Precio: </p>
          <input className='input-agregarUno' name="price" onChange={(e)=>handleChangeInput(e)} value={editable.price}/>
        </div>

        <div
          className='cotainerIcon-agregarUno'>       
          <p className='text-agregarUno'> Stock: </p>
          <input className='input-agregarUno' name="stock" onChange={(e)=>handleChangeInput(e)} value={editable.stock}/>
        </div>

        <div
          className='cotainerIcon-agregarUno'> 
          <p className='text-agregarUno'> Categoria: </p>
          <input className='input-agregarUno' name="category" onChange={(e)=>handleChangeInput(e)} value={editable.category}/>
        </div>

        <div
          className='cotainerIcon-agregarUno'> 
          <p className='text-agregarUno'> Marca: </p>
          <input className='input-agregarUno' name="make" onChange={(e)=>handleChangeInput(e)} value={editable.make}/>
        </div>

        <div 
          className='cotainerIcon-agregarUno'> 
          <p className='text-agregarUno'> Precio de compra: </p>
          <input className='input-agregarUno' name="buyprice" onChange={(e)=>handleChangeInput(e)} value={editable.buyprice}/>
        </div>

        <div 
          className='cotainerIcon-agregarUno'> 
          <p className='text-agregarUno'> Codigo: </p>
          <input className='input-agregarUno' name="barCode" onChange={(e)=>handleChangeInput(e)} value={editable.barCode}/>
        </div>

        <div 
          className='cotainerIcon-agregarUno'>
          <p className='text-agregarUno'> Descripcion: </p>
          <input className='input-agregarUno' name="description" onChange={(e)=>handleChangeInput(e)} value={editable.description}/>
        </div>

        <div 
          className='cotainerIcon-agregarUno'>
          <p className='text-agregarUno'> Imagen: {editable.image} </p>
          <input className='input-agregarUno' name="image" onChange={(e)=>handleChangeInput(e)} value={editable.image}/>
        </div>
          <div className='containerNavBar-agregarUno'>   
            <button
                className='button-agregarUno'
                onClick={()=>eliminar()}
                ><Icon path={mdiDeleteForever} size={2} color='black'/><p>Eliminar</p></button>
            <button
                className='button-agregarUno'
                onClick={()=>guardar()}
                ><Icon path={mdiContentSave} size={2} color='black'/><p className='text-button-agregarUno'>Guardar</p></button>
          </div>
          </div>
    </div>
           
)
}

