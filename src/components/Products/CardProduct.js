import React from "react";
import './CardProduct.css'

const CardProduct = ({ id, nombre, categoria, precio, listaSeleccionados}) => {

  listaSeleccionados = listaSeleccionados? listaSeleccionados.map(e=>e.id):[0]

  return (
      <div
        className={!(listaSeleccionados.includes(id))?'container-CardProduct':'container-CardProducto-selected'}>
        <p className={!(listaSeleccionados.includes(id))?'text1-CardProduct':'text1-CardProduct-selected'}>{nombre}</p>
        <p className={!(listaSeleccionados.includes(id))?'text2-CardProduct':'text2-CardProduct-selected'}>{categoria}</p>
        <p className={!(listaSeleccionados.includes(id))?'text3-CardProduct':'text3-CardProduct-selected'}>{precio} </p>
      </div>
   
  );
};
export default CardProduct;