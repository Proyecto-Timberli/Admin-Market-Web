import React from "react";

const CardProvider = ({nombre, telefono, direccion}) => {

  return ( 
    <>
      <div className='containerCard'>
        <p className='text1'>{nombre}</p>
        <p className='text2'>{telefono}</p>
        <p className='text3'>{direccion} </p>
      </div>
    </>
  );
};
export default CardProvider;

