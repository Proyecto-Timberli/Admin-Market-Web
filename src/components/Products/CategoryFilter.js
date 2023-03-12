import React, { useEffect, useState } from "react";
import {useAuth} from '../../Context/authContext'
import {getFirestore, collection, getDocs, doc} from 'firebase/firestore';
import Icon from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';
import { mdiArrowLeft } from '@mdi/js';

import './CategoryFilter.css'

const Touchable = (text='Select a option',onPress)=>{
    const TouchableComponent = ()=>{
      return (
        <button 
          onClick={onPress}
          className='selectTouch-CategoryFilter'>
          <p className='selectTextOne-CategoryFilter'>{text}</p>
          <Icon path={mdiChevronRight} size={1} color={"black"}/>
        </button>
      )
    }
    return {TouchableComponent}
  }
  const Option =(item, value , selected ,objKey,onPress) =>{
    const OptionComponent =()=>{
      return (
        <button className={!selected?'selectContainer-CategoryFilter':'selectContainerColor-CategoryFilter'} onClick={onPress}>
          <p className={!selected?'selectText-CategoryFilter':'selectTextColor-CategoryFilter'}>{item?.[value]}</p>
        </button>
      )
    }
    return {OptionComponent}
  }
function Select (
    { 
      touchableComponent = Touchable,
      optionComponent=Option,
      touchableText = 'Select a option',  
      title ="",
      data=[],
      objKey ='id',
      objValue="name",
      filtrar
    }
  ){
    const [visible,setVisible] = useState(false)
    const {TouchableComponent}=touchableComponent(touchableText,()=> setVisible(true));
    const [selected,setSelected] = useState(null)
    function renderOption(item){
      const {OptionComponent}=optionComponent(item,objValue,selected, objKey, ()=>toggleSelect(item))
      return <OptionComponent/>
    }
    function toggleSelect(item){
      if(item?.[objKey] === selected?.[objKey]){
        setSelected(null)
        filtrar()
      }else{
        setSelected(item)
        filtrar(item.name)
        setVisible(false)
      }
    }
    return(
      <>
       <TouchableComponent/>  
       {visible&&<div className="modal-CategoryFilter">
           <div className='container-CategoryFilter'>
             <button onClick={()=> setVisible(false)} className='buttonBack-CategoryFilter'>
             <Icon path={mdiArrowLeft} size={2} />
             </button>
            <p className='titleCategorias-CategoryFilter'>{title}</p>
           </div>
           {data.map(item=>renderOption(item))}
       </div>}
      </>
    )
}


export default function CategoriesSelect({filtrar}){
  const {userProfile} = useAuth()
/////////////////////////////////////////////////
/////////////////////////////////////////////////
  const [categoriesApi,setCategoriesApi]= useState(null)
  const getCategories =  ()=>{
    const selectedC = collection(getFirestore(), "users/"+userProfile+"/categories")
      getDocs(selectedC)
      .then(res => setCategoriesApi(res.docs.map(category=>({id:category.id,...category.data()}))))
  }
 
  useEffect(() => {
      getCategories()
  },[]);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
    return(
        <>
        <div className='container-CategoriesSelect'>
          <p className='title-CategoryFilter'>Filtrar por Categorias</p>
          <Select touchableText = "Selecciona una Categoria" title="Selecciona una Categoria" objKey='id' objValue= "name" data={categoriesApi} filtrar={filtrar}/>
        </div>
      </>
    )
}



 /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////

 
 
 