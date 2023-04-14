import './CardProduct.css'
import React from "react";
import Icon from '@mdi/react';
import { mdiCartPlus } from '@mdi/js';
import { useState } from 'react';

const CardProduct = ({ id, nombre, categoria, precio, product, onPress}) => {
  const [state,setState]= useState(
    {...product}
    )
  const handleChangeInput = (e)=>{
    console.log(e.target.value)
    console.log(product)
    setState(
      {...state,
        buyprice: e.target.value
      }
    )
  }

  return (
      <div
        className='container-CardProductCharge'>
        <p className='text1-CardProductCharge'>{nombre}</p>
        <p className='text2-CardProductCharge'>{categoria}</p>
        <input className='input-CardProductCharge' name="buyprice" onChange={(e)=>handleChangeInput(e)} value={precio} placeholder='0.00'/>
        <button 
            className='buttonCartPlus-cobrar'
            onClick={()=>onPress(state)}><Icon path={mdiCartPlus} size={2} color="#212121"/></button>
      </div>
   
  );
};
export default CardProduct;
