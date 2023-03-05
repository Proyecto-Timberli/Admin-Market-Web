import React from "react";
import './CardProduct.css'
const CardProducto = ({ id, nombre, categoria, precio, listaSeleccionados}) => {
  
  listaSeleccionados = listaSeleccionados? listaSeleccionados.map(e=>e.id):[0]

  return (
      <div
        className={!!(listaSeleccionados.includes(id))?'container-CardProducto':'container-CardProducto-selected'}>
        <p className='text1-CardProducto'>{nombre}</p>
        <p className='text2-CardProducto'>{categoria}</p>
        <p className='text3-CardProducto'>{precio} </p>
      </div>
   
  );
};
export default CardProducto;