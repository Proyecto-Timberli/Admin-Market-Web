////////////////////////////////////////////////////
import './NuevaCategoria.css'
import React, {useEffect, useState } from "react";
////////////////////////////////////////////////////
import {useAuth} from '../../Context/authContext'
import {getFirestore, collection, getDocs, doc} from 'firebase/firestore';
import {postFirestore, deleteFirestore} from '../../Firebase/ApiFunctions';
import Loading from '../Reusables/Loading';
////////////////////////////////////////////////////
import Icon from '@mdi/react';
import {useNavigate } from 'react-router-dom';
import { mdiArrowLeft} from '@mdi/js';
import { mdiContentSave } from '@mdi/js';
import { mdiDeleteForever } from '@mdi/js';
const inconColor =("rgb(52, 51, 72)")

export default function NuevaCategoria(){
  const navigate = useNavigate()
  const {userProfile} = useAuth()
  /////////////////////////////////////////////////
  const [categoriesApi,setCategoriesApi]= useState(null)
  const [loadingOn, setLoadingOn] = useState(false)
  const getCategories =  ()=>{
    const selectedC = collection(getFirestore(), "users/"+userProfile+"/categories")
      getDocs(selectedC)
      .then(res => setCategoriesApi(res.docs.map(category=>({id:category.id,...category.data()}))))
  }
 
  useEffect(() => {
      getCategories()
      if (loadingOn){
        setLoadingOn(false)
      }
  },[loadingOn]);
  const [responseApi,setResponseApi]= useState(null)
  useEffect(() => {
    console.log(responseApi)
    if (responseApi==="se elimino el documento"||responseApi=="se agrego el documento"){
      getCategories()
      setCategoria("")
      setResponseApi(null)
      setLoadingOn(false);
    }
},[responseApi]);
  /////////////////////////////////////////////////
  const postCategory = async (data)=>{
    const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/categories")
    postFirestore(selectedCollection,data)
  }
  const deleteCategory = (data)=>{
    const selected = doc(getFirestore(), "users/"+userProfile+"/categories", data.id)
    setResponseApi(deleteFirestore(selected))
  }
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  const [categoria, setCategoria] = useState("");
  const [text, setText] = useState("");
  
  const agregarCategoria = function (e) {
    function namesCategorias(categorias){
      let result=[]
      for(let i=0;i<categorias.length;i++){
       result.push(categorias[i].name)
      }
      return result
    }
    if (e.name == "") {
      alert("Debes completar los campos");
      return;
    }
    if (namesCategorias(categoriesApi).includes(e.name)) {
      alert("Esa categoria ya existe!");
      return;
    }  
    setLoadingOn(true);
    postCategory(e)
    setText("")
    alert("Categoria agregada")
  };
  const eliminarCategoria = async function (e) {
    console.log("eliminar categoria")
    setLoadingOn(true);
    deleteCategory(categoria)
    alert("Categoria Eliminada");
  };
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
            </div>
    <div className='container-categorias'>
      <h2 className='title-categorias'>Categorias</h2>
      <input
          className='textInput-categorias'
          placeholder="Escriba su nueva categoria aquí..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
       {/* NavBar() -------------------------------------------*/}
       <div className = 'navBarContainer-categorias'>   
                            <button 
                                className='buttonNavBar-categorias'
                                onClick={()=>agregarCategoria({name:text})}
                                buttonSize={30}
                            >
                                <Icon path={mdiContentSave} size={2} color={"black"}/>
                                <p>Agregar</p>
                            </button>
        </div>   
      <div className='categoriasContainer-categorias'>
      {!categoriesApi||loadingOn?<Loading/>:
        categoriesApi.map(item=>
          <>
            <button onClick={() => setCategoria(item)} className={categoria === item?'categorias-categorias':'categoriasColor-categorias'}>
                <p className={categoria === item? 'text-categorias': 'textColor-categorias'}>{item.name}</p>
            </button>
            {categoria === item?  (
            <div className='buttonDeleteContainer-categorias'>
              <button  onClick={() => eliminarCategoria(categoria)} className='buttonDelete-categorias'>
              <Icon path={mdiDeleteForever} size={1} color={"red"}/>
              </button>
            </div>
            ) : null}
          </>
         )}
      </div>  
    </div>
    </div>
  );
};
