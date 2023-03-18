

import './Card-Product-In-Cart.css'
import React , {useEffect, useState} from "react";
import Icon from '@mdi/react';
import { mdiCartPlus } from '@mdi/js';
import { mdiCartRemove } from '@mdi/js';

const CardProducto = (
  {id,nombre, categoria, precio,product,shopingCart,shopingCartSave,setShopingCart,venta,setVenta})=>{

  const [cantidad,setCantidad]= useState(1)
    function existe(arrayDeObjetos,atributo,valor){
      for(let i=0;i<arrayDeObjetos.length;i++){
        if(arrayDeObjetos[i][atributo]===valor){
          return true
        }
      }
      return false
    }

  ///////////////////////////////////////////////////////////////
  function addd(ventaEdit){
    let productoSave = shopingCartSave.filter(i=>i.id===id)
    let productoCantidad = ventaEdit.filter(i=>i.id===id)
    let productos = shopingCart
    for(let i=0;i<productos.length;i++){
        if(productos[i].id===id){
            productos[i]={...productos[i],stock:productoSave[0].stock-productoCantidad[0].amount}
        }
    }
    setShopingCart(productos)  
  }  
  function removee(Producto){
    setShopingCart(shopingCart.filter(p=>p.id!=Producto.id))     
  }
  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    if(!existe(venta,"id",id)&&cantidad>0){
      setVenta([...venta,{id:id,name:nombre,amount:cantidad,price:precio}])
      let productoSave = shopingCart.filter(i=>i.id===id)
      setShopingCart([...shopingCart.filter(i=>i.id!=id),{...productoSave[0],stock:productoSave[0].stock-cantidad}])
    }else{
      if(cantidad===0){
        let ventaEdit=venta.filter(i=>i.id!=id)
        setVenta(ventaEdit)
        removee(product)
      }
      else{
        let ventaEdit = [...venta]
        for(let i=0;i<ventaEdit.length;i++){
          if(ventaEdit[i].id===id){
            ventaEdit[i]={...ventaEdit[i],amount:cantidad}
          }
        }
        setVenta(ventaEdit)
        addd(ventaEdit)
      }
    }
  },[cantidad])
    function add(){
      setCantidad(cantidad+1)
    }
    function remove(){
      setCantidad(cantidad-1)
    }
    return (
      <div className='container-CardProductInCart'>
        <div
          className='lista-CardProductInCart'>
          <p className='texto1-CardProductInCart'>{nombre}</p>
          <p className='texto2-CardProductInCart'>{categoria}</p>
          <p className='texto3-CardProductInCart'>{precio} </p>
        </div >
        <div 
          className="listaCart-CardProductInCart"> 
          <button onClick={()=>remove()} className='button-CardProductInCart'><Icon path={mdiCartRemove } size={1} color={'white'}/></button>
            <p className="TextWhite-CardProductInCart">Cantidad: {cantidad}</p>
          <button onClick={()=>add()} className='button-CardProductInCart'><Icon path={mdiCartPlus } size={1} color={'white'}/></button>
        </div>
      </div>
    );
  


};


export default CardProducto;
