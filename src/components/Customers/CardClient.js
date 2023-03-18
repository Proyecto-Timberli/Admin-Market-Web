import React from "react";
import './CardClient.css'
const CardClient = ({nombre, telefono, direccion}) => {

  return ( 
    <>
      <div className='containerCard-CardClient'>
        <p className='text1-CardClient'>{nombre}</p>
        <p className='text2-CardClient'>{telefono}</p>
        <p className='text3-CardClient'>{direccion} </p>
      </div>
    </>
  );
};
export default CardClient;

