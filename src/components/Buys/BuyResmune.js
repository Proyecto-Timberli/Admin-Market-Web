
import './BuyResumen.css'
////////////////////////////////////////////////////
import React, {useEffect, useState } from "react";
////////////////////////////////////////////////////
import {useAuth} from '../../Context/authContext'
import {getFirestore, doc ,getDoc} from 'firebase/firestore';
import {deleteFirestore,putFirestore} from '../../Firebase/ApiFunctions'
////////////////////////////////////////////////////
import { useNavigate } from 'react-router';
import {useLocation} from 'react-router-dom';

import Icon from '@mdi/react';
import { mdiContentSave } from '@mdi/js';
import { mdiDeleteForever } from '@mdi/js';
import { mdiArrowLeft } from '@mdi/js';

import QRCode  from  "react-qr-code" ;

import { PDFViewer } from '@react-pdf/renderer';
import CanvasQR from './canvasQR';
////////////////////////////////////////////////////
const BuyResumen = ()=>{
  const {userProfile} = useAuth()
/////////////////////////////////////////////////////////
const navigate = useNavigate()
const locate = useLocation()
const {id,buyProducts,createdDate,total,provider,idProvider,wayToPay} = locate.state
const data = buyProducts
/////////////////////////////////////////////////////////
const [businessApi,setBusinessApi] = useState(null)
const getMyBusinessApi = ()=>{
  const selectedDoc = doc(getFirestore(), "users/"+userProfile)
  getDoc(selectedDoc).then(res => setBusinessApi(res.data()))
}
const [elemento,setElemento] = useState(false)
useEffect(()=>{
  getMyBusinessApi()
  setElemento(document.getElementById(id+'D'))
},[])
  const deleteSale = ()=>{
    const selected = doc(getFirestore(), "users/"+userProfile+"/buys", id)
    deleteFirestore(selected)
    // putproduct stoock
  }
  const putProductsStock = (data)=>{
    data.forEach(product=>{
        const selectedDoc = doc(getFirestore(), "users/"+userProfile+"/products", product.id)
        let productEdit=null
        getDoc(selectedDoc).then(
          res => {return({id:res.id,...res.data()})}).then(res=>putFirestore(selectedDoc,({...res,stock:res.stock-product.amount})))
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        })
    });
  }

 
/////////////////////////////////////////////////////////
  
  const anular = (products) => {
    deleteSale()
    putProductsStock(products)
    alert("Compra Anulada");
    navigate(-1)
  }

/////////////////////////////////////////////////////////

      //hacer global
      function financial(x) {
        return Number.parseFloat(x).toFixed(2);
      }

  const [pdfVisible,setPdfVisible] = useState(false)
  const algoprueba = ()=>{
    console.log('-businessDate-----------------------------')
    console.log(businessApi)
    console.log(pdfVisible)
    console.log('-businessDate-----------------------------')
    setPdfVisible(!pdfVisible)
  }
    return (
      <>
      {pdfVisible&&businessApi? 
      <div style={{position:'absolute',width:'100%',height:'auto',top:'0',left:'0',backgroundColor:'#fff'}}>
        <Icon onClick={()=>{algoprueba()}}path={mdiArrowLeft} size={2} color='rgb(52, 51, 72)'/>
        
      </div>:
      <div className='container-MenuProductos'>
          <div className = 'container-nav-MenuProductos'>              
                  <div className='button-Container-MenuProductos'>
                        <button  className='button-MenuProductos' onClick={() => navigate(-1)}>
                          <Icon path={mdiArrowLeft} size={2} color='rgb(52, 51, 72)'/>
                          <p className='text-button-MenuProductos'>Volver</p>
                        </button>
                  </div>
                  <div className='button-Container-MenuProductos'>
                        <button  className='button-MenuProductos' onClick={()=>anular(data)}>
                          <Icon path={mdiDeleteForever} size={2} color='rgb(52, 51, 72)'/>
                          <p className='text-button-MenuProductos'>Anular</p>
                        </button>
                  </div>
                  {/* <div className='button-Container-MenuProductos'>
                        <button  className='button-MenuProductos' 
                        onClick={()=>{algoprueba()}}
                        // onClick={()=>{console.log(elemento.toDataURL('image/svg+xml'))}}       
                        >
                          
                          <Icon path={mdiContentSave} size={2} color='rgb(52, 51, 72)'/>
                          <p className='text-button-MenuProductos'>Comprobante</p>
                        </button>
                  </div> */}
        </div>  
        <div className='container-VentaResumen'>
                <div className='lista-VentaResumen'>
                  <div>
                    <p className='text-VentaResumen'>Nro de Compra: {id}</p>
                    <p className='text-VentaResumen'>Fecha: {createdDate} </p>
                    <p className='text-VentaResumen'>Provedor: {provider?provider:"ninguno"}</p>
                    <p className='text-VentaResumen'>Nro de Provedor: {idProvider?idProvider:"ninguno"}</p>
                    <p className='text-VentaResumen'>Forma de Pago: {wayToPay?wayToPay:"ninguna"} </p>
                  </div>
                  <div className='qrContainer-VentaResumen'>
                    < QRCode 
                    id={id+'D'}
                    size = { 256 } 
                    style = { {  height : "auto" ,  maxWidth : "100%" ,  width : "100%"  } }
                    value = {id} 
                    viewBox = { `0 0 256 256` } 
                  />                 
                  </div>  
                  
                  
                </div >       
            <div className='container2-VentaResumen'>
                {data.map(item => 
                <div className='lista2-VentaResumen'>
                                    <p className='textProductName-VentaResumen'>{item.name}</p>
                                    <p className='textPorducto-VentaResumen'>Precio por unidad: {item.price?financial(item.price):null}</p>
                                    <p className='textPorducto-VentaResumen'>Cantidad: {item.amount}</p>
                                    <p className='textPorducto-VentaResumen'>Total Producto: {item.price?financial(item.price*item.amount):null}</p>
                </div>)}
                <p className='TextTotal-VentaResumen'>Total: {total}</p>
          </div> 
      </div>  
    </div>}
    </>
    );
};
  

export default BuyResumen;