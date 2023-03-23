import './Agregar-uno.css'
import React, { useState } from 'react';
import {useAuth} from '../../Context/authContext'
import Icon from '@mdi/react';
import { mdiBorderColor } from '@mdi/js';
import { mdiContentSave } from '@mdi/js';
import { mdiDeleteForever } from '@mdi/js';
import { mdiCheckboxMarked } from '@mdi/js';
import { mdiCloseBox } from '@mdi/js';
import {getFirestore, collection} from 'firebase/firestore';
import {postFirestore} from '../../Firebase/ApiFunctions'
////////////////////////////////////////////////////

// function ModalSalir({navigation,stateModal}){
//   function checkOk(){
//     stateModal(false)
//     navigation.navigate("MenuProductos")
//   }
//   function exit(){
//     stateModal(false)
//   }
//   return (
//     <div style={styles.modalContainer}>
//     <LinearGradient 
//       colors={colorA}
//       start={{x:1,y:0}}
//       end={{x:0,y:1}}
//       style={styles.modal}>
//       <Text style={{...styles.textTitle,marginTop:30}}>Desea cancelar y salir?</Text>
//       <View style={styles.modalButtonsContainers}>
//         <TouchableOpacity onPress={()=>checkOk()}><Icons name="checkbox-marked" size={35} color="green" /></TouchableOpacity> 
//         <TouchableOpacity onPress={()=>exit()}><Icons name="close-box" size={35} color="red" /></TouchableOpacity> 
//       </View> 
//     </LinearGradient>
//     </View>
//   )
// }

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

function Editar({dato, setState, stateModal }){
  const edit = ()=>{
    setState(dato)
    console.log("edit "+ dato)
    stateModal(true)
  }
  return (
    <button
      className='editar-agregarUno'
      onClick={()=> edit()}>
      <Icon path={mdiBorderColor} size={1} color="black" />
    </button>
  )
}

export default function AgregarUno({navigation}) {
  console.log("------------------------")
  console.log("AgregarUno")
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
  const salir = () => {
    console.log("salir")
    setModalSalir(true)
  }
  /////////////////////////////////////////////////
   const postProducts = (data)=>{
    const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/products")
    postFirestore(selectedCollection,data)
  }
  /////////////////////////////////////////////////
  const agregar = () => {
    if(!editable.name){
      return alert("Complete los campos");
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
      return alert("Se agrego el producto");
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
    <div className='container-agregarUno'>
        {modal&&<Modal dato={dato} state={editable} setState={setEditable} stateModal={setModal}/>}
        {/* {modalSalir&&<ModalSalir navigation={navigation}stateModal={setModalSalir}/>} */}
        
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
            {/* <button
                className='button-agregarUno'
                onClick={()=>salir()}
                ><Icon path={mdiDeleteForever} size={1} color='black'/><p>Salir</p></button> */}
            <button
                className='button-agregarUno'
                onClick={()=>agregar()}
                ><Icon path={mdiContentSave} size={2} color='white'/><p className='text-button-agregarUno'>Agregar</p></button>
          </div>
      
    </div>
           
)
}

