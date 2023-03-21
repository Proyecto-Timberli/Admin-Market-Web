

////////////////////////////////////////////////////
import React, {useEffect, useState } from "react";
////////////////////////////////////////////////////
import {useAuth} from '../../Context/authContext'
import {getFirestore, doc ,getDoc} from 'firebase/firestore';
import {deleteFirestore,putFirestore} from '../../Firebase/apiFunctions'
////////////////////////////////////////////////////
////////////////////////////////////////////////////
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';



////////////////////////////////////////////////////
const VentaResumen = ()=>{
  console.log("------------------------")
  console.log("VentaResumen")
  const {userProfile} = useAuth()
/////////////////////////////////////////////////////////
  const {id,resumen,fecha,total,client,idClient,wayToPay}=route.params
  const data = resumen
/////////////////////////////////////////////////////////
const [businessApi,setBusinessApi] = useState(null)
const getMyBusinessApi = ()=>{
  const selectedDoc = doc(getFirestore(), "users/"+userProfile)
  getDoc(selectedDoc).then(res => setBusinessApi(res.data()))
}
useEffect(()=>{
  getMyBusinessApi()
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
  const html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body className="width:100%;text-align: center;justify-content: center;">
    <div className="display:flex;flex-wrap: wrap;background-color:#F8E9E9;margin-bottom:15px; ">
      <div className="width:59%;height:28%;padding:10px;text-align:left;">
        <p className="text-align:right;">No valido como factura</p>
        <p>${businessApi?.myBusiness?.negocio?businessApi.myBusiness.negocio:null}</p>
        <p>${businessApi?.myBusiness?.de?businessApi.myBusiness.de:null}</p>
        <p>Cuit: ${businessApi?.myBusiness?.cuit?businessApi.myBusiness.cuit:null}</p>
        <p>Telefono: ${businessApi?.myBusiness?.telefono?businessApi.myBusiness.telefono:"Ninguno"}</p>
        <p>Fecha: ${fecha}</p>
        <p>Nro de venta: ${id}</p>
        <p>Cliente: ${client}</p>
        <p>Nro de Cliente: ${idClient}</p>
        <p>Forma de pago: ${wayToPay}</p>
      </div>
      <div className="width:35%;height:28%;">
        <img className="margin-top:36px;"src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Codigo_QR.svg/2048px-Codigo_QR.svg.png" alt="QR" width="250" height="250">
      </div>
    </div>
      ${resumen.map(product=> 
        ` <div className="background-color:#F8E9E9;width:100%;height:9%;margin-bottom:5px;display:flex;flex-wrap: wrap;">
            <p className="width:100%;text-align:center;">${product.name}</p>
            <p className="width:33%;text-align:center;">Precio por unidad: $ ${product.price}</p>            
            <p className="width:33%;text-align:center;">Cantidad: ${product.amount}</p>          
            <p className="width:33%;text-align:center;">Precio Final $ ${product.price*product.amount}</p>
            
          </div>`
      )}
      
      <p className="background-color:#F8E9E9;width:100%;margin-bottom:15px; padding:10px;">Total: $ ${total}</p>
    </body>
  </html>
  `;
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    // getMyBusinessApi()
    await Print.printAsync({
      html,
      height: 92, 
      width:192,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };
      //hacer global
      function financial(x) {
        return Number.parseFloat(x).toFixed(2);
      }
  console.log("------------------------")
  

    return (
            <div className='container-VentaResumen'>
                <div className='lista-VentaResumen'>
                    <p className='text-VentaResumen'>Nro de venta: {id}</p>
                    <p className='text-VentaResumen'>Fecha: {fecha} </p>
                    <p className='text-VentaResumen'>Cliente: {client?client:"ninguno"}</p>
                    <p className='text-VentaResumen'>Nro de Cliente: {idClient?idClient:"ninguno"}</p>
                    <p className='text-VentaResumen'>Forma de Pago: {wayToPay?wayToPay:"ninguna"} </p>
                </div >
                
                
                <div className='container2-VentaResumen'>
                {data.map(item => 
                          <div 
                            className='lista2-VentaResumen'>
                                    <p className='text-VentaResumen'>{item.name}</p>
                                    <p className='text-VentaResumen'>Precio por unidad: {item.price?financial(item.price):null}</p>
                                    <p className='text-VentaResumen'>Cantidad: {item.amount}</p>
                                    <p className='text-VentaResumen'>Total Producto: {item.price?financial(item.price*item.amount):null}</p>
                          </div>)}
                <p className='TextTotal-VentaResumen'>Total:{total}</p>
                   {/* NavBar() -------------------------------------------*/}
                   <div className = 'containerNavBar-VentaResumen'>   
                    <button
                        className='buttonNavBar-AddClient'
                        onClick={()=>salir()}
                        ><Icon path={mdiArrowLeft} size={2} color='white'/><p className="textWhite">Volver</p></button>
                    <button
                        className='buttonNavBar-AddClient'
                        onClick={()=>anular(data)}
                        ><Icon path={mdiDeleteForever} size={2} color='white'/><p className="textWhite">Anular</p></button>
                    <button 
                        className='buttonNavBar-AddClient'
                        onClick={()=>{Platform.OS === 'ios'?selectPrinter: print}}
                        ><Icon path={mdiContentSave} size={2} color='white'/><p className="textWhite">Comprobante</p></button>
                </div> 
            </div>  
            </div>  
        
    );
};
  

//   const styles = StyleSheet.create({
//     container:{
//       marginTop:-35,
//       flex:1,
//       alignItems: "center",
//     },
    
//     lista: {
//       width:width*0.9,
//       marginTop:30,
//       marginBottom: 20,
//       height:height*0.15,
//       backgroundColor: "#F8E9E9",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//       lista2: {
//       width: width*0.9,
//       height: height*0.13,
//       marginBottom: 5,
//       padding: 10,
//       flexWrap: "wrap"
//     },
//     text: { color: "black"},
//     textTotal:{
//       color: "black",
//       fontSize: 18,
//     },

  
//       /* NavBar() -------------------------------------*/
//          textNavBar : {
//             textAlign: "center",
//             fontSize: 14,
//             fontWeight: 'bold',
//             color: 'black',               
//           } ,
//           containerNavBar: {
//             position: "absolute",
//             bottom: 0,
//             width: '100%',
//             height: 70,
//             backgroundColor: '#fff',
//             justifyContent: 'space-around',
//             alignItems: 'center',
//             flexDirection: 'row',
//           },
// })




export default VentaResumen;