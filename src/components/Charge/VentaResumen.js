
import './VentaResumen.css'
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
import ResumenPdf from './ResumenPdf';
import { PDFViewer } from '@react-pdf/renderer';
import CanvasQR from './canvasQR';
////////////////////////////////////////////////////
const VentaResumen = ()=>{
  const {userProfile} = useAuth()
/////////////////////////////////////////////////////////
const navigate = useNavigate()
const locate = useLocation()
const {id,sellProducts,createdDate,total,client,idClient,wayToPay} = locate.state
const data = sellProducts
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
    const selected = doc(getFirestore(), "users/"+userProfile+"/sales", id)
    deleteFirestore(selected)
    // putproduct stoock
  }
  const putProductsStock = (data)=>{
    data.forEach(product=>{
        const selectedDoc = doc(getFirestore(), "users/"+userProfile+"/products", product.id)
        let productEdit=null
        getDoc(selectedDoc).then(
          res => {return({id:res.id,...res.data()})}).then(res=>putFirestore(selectedDoc,({...res,stock:res.stock+product.amount})))
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        })
    });
  }

 
/////////////////////////////////////////////////////////
  
  const anular = (products) => {
    deleteSale()
    putProductsStock(products)
    alert("Venta Anulada");
    navigate('sells')
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
        <PDFViewer style={{width:'100%' ,height:'90vh'}}><ResumenPdf sell={locate.state} businessDate={businessApi}/></PDFViewer>
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
                  <div className='button-Container-MenuProductos'>
                        <button  className='button-MenuProductos' 
                        onClick={()=>{algoprueba()}}
                        // onClick={()=>{console.log(elemento.toDataURL('image/svg+xml'))}}       
                        >
                          
                          <Icon path={mdiContentSave} size={2} color='rgb(52, 51, 72)'/>
                          <p className='text-button-MenuProductos'>Comprobante</p>
                        </button>
                  </div>
        </div>  
        <div className='container-VentaResumen'>
                <div className='lista-VentaResumen'>
                  <div>
                    <p className='text-VentaResumen'>Nro de venta: {id}</p>
                    <p className='text-VentaResumen'>Fecha: {createdDate} </p>
                    <p className='text-VentaResumen'>Cliente: {client?client:"ninguno"}</p>
                    <p className='text-VentaResumen'>Nro de Cliente: {idClient?idClient:"ninguno"}</p>
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
  

export default VentaResumen;