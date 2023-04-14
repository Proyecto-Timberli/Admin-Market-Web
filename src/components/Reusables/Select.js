import React, { useEffect, useState } from "react";
import Icon from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';
import { mdiArrowLeft } from '@mdi/js';

import './Select.css'

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
  const Option =(item, value , selected ,onPress) =>{
    const OptionComponent =()=>{
      return (
        <button className={!selected?'selectContainer-CategoryFilter':'selectContainerColor-CategoryFilter'} onClick={()=>onPress()}>
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
      selectFunction
    }
  ){
    const [visible,setVisible] = useState(false)
    const {TouchableComponent}=touchableComponent(touchableText,()=> setVisible(true));
    const [selected,setSelected] = useState(null)
    function renderOption(item){
        const {OptionComponent}=optionComponent(item,objValue,selected, ()=>toggleSelect(item))
        return <OptionComponent key={item.id}/>
    }
    function toggleSelect(item){
        if(item?.[objKey] === selected?.[objKey]){
            setSelected(item)
            selectFunction(item)
        }else{
            setSelected(item)
            selectFunction(item)
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


export default function CategoriesSelect({text='Seleccionar',text2='',arraySelects,selectFunction}){

    return(
        <>
        <div className='container-CategoriesSelect'>
          <p className='title-CategoryFilter'>{text}</p>
          <Select touchableText = {text2}
            title="Selecciona una opcion" 
            objKey='id' 
            objValue= "name" 
            data={arraySelects} 
            selectFunction={selectFunction}/>
        </div>
      </>
    )
}



 /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////

 
 
 