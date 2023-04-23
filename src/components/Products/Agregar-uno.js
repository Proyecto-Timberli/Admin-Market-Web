import './Agregar-uno.css'
import React, { useState } from 'react';
import {useAuth} from '../../Context/authContext'
import Icon from '@mdi/react';
import { mdiContentSave } from '@mdi/js';
import { mdiCheckboxMarked } from '@mdi/js';
import { mdiCloseBox } from '@mdi/js';
import {getFirestore, collection} from 'firebase/firestore';
import {postFirestore} from '../../Firebase/ApiFunctions'
import {alertConfirmacion} from '../Reusables/Alerts'
import {useNavigate } from 'react-router-dom';
import { mdiArrowLeft} from '@mdi/js';
const inconColor =("rgb(52, 51, 72)")
////////////////////////////////////////////////////


function Modal({dato, state, setState, stateModal}){
  const [editado, setEditado]=useState(state[dato])
  function modalHandler(e){
    setEditado(e)
  }
  function checkOk(){
    setState({
      ...state,
      [dato]:editado
    })
    stateModal(false)
  }
  function exit(){
    stateModal(false)
  }
  return (
    <div className='modalContainer-agregarUno'>
    <div 
      className='modal'>
      <input
            className='textInput-modal'
            onChange={(e) => modalHandler(e)}
            value={editado?.toString()}
          />
      <div className='modalButtonsContainers'>
        <button onClick={()=>checkOk()}><Icon path={mdiCheckboxMarked} size={2} color="green"/></button> 
        <button onClick={()=>exit()}><Icon path={mdiCloseBox} size={2} color="red" /></button> 
      </div> 
    </div>
    </div>
  )
}


export default function AgregarUno() {
  console.log("------------------------")
  console.log("AgregarUno")
  const navigate = useNavigate()
  const {userProfile}= useAuth()
  /////////////////////////////////////////////////
  const[editable,setEditable]= useState({
    name: "",
    price: "",
    stock : "",
    category: "",
    make: "",
    buyprice: "",
    barCode : "",
    description: "",
    image : "",
  })
  const handleChangeInput = (e)=>{
    setEditable({
      ...editable,
      [e.target.name]:e.target.value
    })
  }
  /////////////////////////////////////////////////
  const[modal,setModal]= useState(false)
  const[dato,setDato]= useState(false)
  const[modalSalir,setModalSalir]= useState(false)
  const [scannOn,setScannOn]=useState(false)

  /////////////////////////////////////////////////
   const postProducts = (data)=>{
    const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/products")
    postFirestore(selectedCollection,data)
  }
  /////////////////////////////////////////////////
  const agregar = () => {
    if(!editable.name){
      return false;
    }else{
      postProducts(editable)
      console.log("Producto agregado")
      setEditable({
        name: "",
        price: "",
        stock : "",
        category: "",
        make: "",
        buyprice: "",
        barCode : "",
        description: "",
        image : "",
      })
      return true;
    }
  }
  /////////////////////////////////////////////////
  const copyCode = (code) => {
    setEditable({
      ...editable,
      barCode:code
    })
  }
  /////////////////////////////////////////////////
  console.log("------------------------")
  return (
    <div className='container-MenuProductos'>
    <div className='imgBackGroundCustom'></div>
          <div className='container-nav-MenuProductos'>
              <div className='button-Container-MenuProductos'>
                  <button className='button-MenuProductos' onClick={() => navigate(-1)}>    
                      <Icon path={mdiArrowLeft} size={2} color={inconColor} />   
                  </button>
              </div>:<div className='button-Container-MenuProductos'></div>
              <div className='button-Container-MenuProductos'>   
            <button
                className='button-MenuProductos'
                onClick={()=>alertConfirmacion("Agregar Producto?",null,agregar,"Complete los campos")}
                ><Icon path={mdiContentSave} size={2} color='#1a6b91'/><p className='text-button-MenuProductos'>Agregar</p></button>
          </div>
          </div>
        
    <div className='container-agregarUno'>
        {modal&&<Modal dato={dato} state={editable} setState={setEditable} stateModal={setModal}/>}
        
          <h2 className='textTitle-agregarUno'>Agregar Producto</h2>
        

        <div 
          className='cotainerIcon-agregarUno'>       
          <p className='text-agregarUno'>Nombre del producto: </p> 
          <input className='input-agregarUno' name="name" onChange={(e)=>handleChangeInput(e)} value={editable.name}/>
        </div>

        <div
          className='cotainerIcon-agregarUno'>      
          <p className='text-agregarUno'> Precio: </p>
          {/* <Editar dato={"price"} setState={setDato} stateModal={setModal}/> */}
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

