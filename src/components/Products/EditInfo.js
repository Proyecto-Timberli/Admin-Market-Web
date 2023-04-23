import './Agregar-uno.css'
import React, { useState } from 'react';
import {useAuth} from '../../Context/authContext'
import Icon from '@mdi/react';
import { mdiContentSave } from '@mdi/js';
import { mdiDeleteForever } from '@mdi/js';
import { mdiArrowLeft } from '@mdi/js';
import {getFirestore, doc, } from 'firebase/firestore';
import {deleteFirestore,putFirestore} from '../../Firebase/ApiFunctions'
import {alertConfirmacion} from '../Reusables/Alerts'
import { useLocation, useNavigate } from 'react-router';
const inconColor =("rgb(52, 51, 72)")
////////////////////////////////////////////////////



export default function EditInfo() {
  const {userProfile}= useAuth()
  const locate = useLocation()
  const navigate = useNavigate()
  /////////////////////////////////////////////////
  const {barCode, buyprice, category, description,id,image, make, name, price, stock} = locate.state
  
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




  const eliminar = () => {
    deleteProducts()
    return true
  }
  const guardar = () => {
    putProducts(editable)
    return true;
  }

  //////////////////////////////////////////////////////////
  //hacer global
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  console.log("------------------------")
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
                  <button  className='button-MenuProductos'onClick={()=>alertConfirmacion("Eliminar Producto?",null,eliminar)}>    
                      <Icon path={mdiDeleteForever} size={2}  color='#1a6b91' />  
                      <p className='text-button-MenuProductos'>Eliminar</p> 
                  </button>
              </div>

              <div className='button-Container-MenuProductos'>
                  <button className='button-MenuProductos' onClick={()=>alertConfirmacion("Actualizar Producto?",null,guardar)}>    
                      <Icon path={mdiContentSave} size={2}  color='#1a6b91' />   
                      <p className='text-button-MenuProductos'>Guardar</p>
                  </button>
              </div>
          </div>
    <div className='container-agregarUno'>
      
        <div className='containerBack-agregaruno'>
          <h2 className='textTitle-agregarUno'>Informacion del Producto: {id}</h2>    
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

        {/* <div
          className='cotainerIcon-agregarUno'>       
          <p className='text-agregarUno'> Stock: </p>
          <input className='input-agregarUno' name="stock" onChange={(e)=>handleChangeInput(e)} value={editable.stock}/>
        </div> */}

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

        {/* <div 
          className='cotainerIcon-agregarUno'> 
          <p className='text-agregarUno'> Precio de compra: </p>
          <input className='input-agregarUno' name="buyprice" onChange={(e)=>handleChangeInput(e)} value={editable.buyprice}/>
        </div> */}

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
    </div>
    </div>
           
)
}

