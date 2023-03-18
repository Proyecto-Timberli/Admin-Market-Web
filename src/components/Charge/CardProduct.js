import './CardProduct.css'
import React from "react";
import Icon from '@mdi/react';
import { mdiCartPlus } from '@mdi/js';

const CardProduct = ({ id, nombre, categoria, precio, product, onPress}) => {

  return (
      <div
        className='container-CardProductCharge'>
        <p className='text1-CardProductCharge'>{nombre}</p>
        <p className='text2-CardProductCharge'>{categoria}</p>
        <p className='text3-CardProductCharge'>{precio} </p>
        <button 
            className='buttonCartPlus-cobrar'
            onClick={()=>onPress(product)}><Icon path={mdiCartPlus} size={2} color="#212121"/></button>
      </div>
   
  );
};
export default CardProduct;
