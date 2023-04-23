import { useEffect,useState } from 'react';
import {Document,Page,Text,View,Image} from '@react-pdf/renderer';
import QRCode  from  "react-qr-code" ;
import { formatDate } from '../../Firebase/ApiFunctions';

export default function ResumenPdf({sell,businessDate}){
    const {negocio,de,cuit,telefono,} = businessDate.myBusiness
    const {createdDate,id,client,idClient,wayToPay,total,sellProducts} = sell
   
    useEffect(()=>{
        console.log(document.getElementById(id+'D'));
    },[])
return(
    <>
    < QRCode 
        id={id+'D'}
        value = {id} 
        size = { 256 } 
        bgColor={'#ffffff'}
        fgColor={'#000000'}
        level={'H'}
        includeMargin={true} />
    <Document>
        <Page size='A4'>
        <View style={{width:'100%',height:'auto',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:'12px',marginTop:'1%'}}>No valido como factura</Text>
            <View style={{width:'100%',display:'flex',flexDirection:'row',marginBottom:'4%'}}>
                <View style={{width:'59%',height:'auto',paddingLeft:'5%',paddingTop:'5%'}}>
                    <Text style={{fontSize:'12px',textAlign:'left'}}>{negocio}</Text>
                    <Text style={{fontSize:'12px',textAlign:'left'}}>{de}</Text>
                    <Text style={{fontSize:'12px',textAlign:'left'}}>Cuit: {cuit}</Text>
                    <Text style={{fontSize:'12px',textAlign:'left'}}>Telefono: {telefono}</Text>
                    <Text style={{fontSize:'12px',textAlign:'left'}}>Fecha:{" "+formatDate(createdDate).formatDate+" / "+formatDate(createdDate).hora}</Text>
                    <Text style={{fontSize:'12px',textAlign:'left'}}>Nro de venta: {id}</Text>
                    {client&&<><Text style={{width:'80%',fontSize:'12px',textAlign:'left'}}>Cliente: {client}</Text>
                    <Text style={{width:'80%',fontSize:'12px',textAlign:'left'}}>Nro de Cliente: {idClient}</Text></>}
                    <Text style={{width:'80%',fontSize:'12px',textAlign:'left'}}>Forma de pago: {wayToPay}</Text>
                </View>
                <View style={{width:'41%',height:'auto'}}>
                    {/* <Image allowDangerousPatchs src={dataQRUrl}/> */}
                </View>
            </View>
            {sellProducts.map(product=> 
            <View style={{width:'100%',height:'auto',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginBottom:'2%'}}>
                <Text style={{width:'100%',fontSize:'12px',textAlign:'center'}}>Producto: {product.name}</Text>
                <View style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={{width:'30%',fontSize:'12px',textAlign:'center'}}>Precio producto: ${product.price}</Text>            
                <Text style={{width:'30%',fontSize:'12px',textAlign:'center'}}>Cantidad: {product.amount}</Text>          
                <Text style={{width:'30%',fontSize:'12px',textAlign:'center'}}>Total cantidad ${product.price*product.amount}</Text> 
                </View>     
            </View>)}
        <Text style={{width:'80%',fontSize:'12px',textAlign:'right',marginTop:'4%'}}>Total: ${total}</Text>
        </View>
        </Page>
    </Document>
    </>
   
)
}