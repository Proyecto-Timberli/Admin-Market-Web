////////////////////////////////////////////////////
import React, {useEffect, useState } from "react";
////////////////////////////////////////////////////
import {useAuth} from '../../Context/authContext'
import {getFirestore,getDocs, collection,doc,Timestamp} from 'firebase/firestore';
import {postFirestore,putFirestore} from '../../Firebase/ApiFunctions'
////////////////////////////////////////////////////
import {Modal} from '../Reusables/Modal'
////////////////////Colors//////////////////////////
import CardProducto from './Card-Product-In-Cart'


import Icon from '@mdi/react';
import { mdiCashRegister, mdiCheckboxMarked } from '@mdi/js';
import { mdiCloseBox } from '@mdi/js';
import { mdiPlusBox } from '@mdi/js';
import { mdiAutorenew } from '@mdi/js';




const WayToPay = ({setStateModal, functionCheckOk})=> {
    const wayToPay=["Efectivo","Debito","Credito","Transferencia"]
    const [pay,setPay] = useState(null)
    function checkOk(){
        functionCheckOk(pay)
        setStateModal(false)
    }
    function exit(){
        setStateModal(false)
    }
    return (
        <div className='modalContainer'>
        <div
          className='Modal'>
          <p className='textModal-wayToPay'>Selecciona una forma de pago</p>
          {wayToPay.map(item=>
            <div>    
                <button className={{margin:5}}onClick={()=>{setPay(item)}}>
                    <p className={pay===item?'textBlack-wayToPay':'text-wayToPay'}>{item}</p>
                </button>
            </div>  )}
          <div className='modalButtonsContainers'>
          <button onClick={()=>checkOk()}><Icon path={mdiCheckboxMarked} size={2} color="green"/></button> 
        <button onClick={()=>exit()}><Icon path={mdiCloseBox} size={2} color="red" /></button> 
          </div> 
        </div>
        </div>
    )
}
export default function MenuCobrar({route}){
    console.log("------------------------")
    console.log("MenuCobrar")
    const {userProfile} = useAuth()
    /////////////////////////////////////////////////////
    function existe(arrayDeObjetos,atributo,valor){
        for(let i=0;i<arrayDeObjetos.length;i++){
          if(arrayDeObjetos[i][atributo]===valor){
            return true
          }
        }
        return false
    }
    /////////////////////////////////////////////////////
    const[shopingCart,setShopingCart]=useState([]);
    const[shopingCartSave,setShopingCartSave]=useState([]);
    const[total,setTotal]= useState(0.00);
    const[venta,setVenta]= useState([])
    
    /////////////////////////////////////////////////////
    useEffect(() => {
        if (route.params?.products) {
            if(!existe(shopingCart,"id",route.params?.products.id)){
                setShopingCart([...shopingCart,route.params.products])
                setShopingCartSave([...shopingCartSave,route.params.products])
            }
        }
    }, [route.params?.products]);
   
    /////////////////////////////////////////////////////
    //////////////////////////registar///////////////////
    /////////////////////////////////////////////////////
    useEffect(() => {
        sumaProductos()
    },[venta])
    function sumaProductos(){
        let value = 0
        venta?.forEach(producto => value=(value+(producto.amount*producto.price)));
        setTotal(value)
    }
    const putProductsStock = (data)=>{
        data.forEach(product=>{
            const selected = doc(getFirestore(), "users/"+userProfile+"/products", product.id)
            putFirestore(selected,product)
        });
    }
    const postSale =(data)=>{
        const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/sales")
        postFirestore(selectedCollection,data)
    }
    
    function registar(ventar=venta, productos=shopingCart){
        if(!ventar[0]){
            alert("No hay venta para registrar")
        }else{
            let postVentar =  {
                idClient:client?.id?client.id:null,
                client:client?.identifier?client.identifier:null,
                total:total,
                sellProducts:ventar,
                createdDate:Timestamp.now().toDate().toString(),
                wayToPay:wayToPays?wayToPays:null
            }
            postSale(postVentar)
            putProductsStock(productos)
            limpiar()
        }
            
        }
       

  
    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////
    //Funcion Filtro Scann
    const [scannOn,setScannOn]=useState(false)
    const [productsApi,setProductsApi]=useState(null)
    const [filterScanned,setFilterScanned]=useState(null)
    const getProducts =  ()=>{
      const selectedC = collection(getFirestore(), "users/"+userProfile+"/products")
        getDocs(selectedC)
        .then(res => setProductsApi(res.docs.map(sale=>({id:sale.id,...sale.data()}))))
    }
    function filterScann(code) {
        if (!productsApi){return} 
        if (!code){return setFilterScanned(null)}
        let filter = productsApi.filter((e) =>e.barCode && e.barCode.includes(code))  
        if (filter){
            return filter[0]
        }else{return null}
    }
    useEffect(() => {
        getProducts()
    },[]);
    const addToCarScanned = (code) => {
        let scan = filterScann(code)
        if (!scan){
            return  alert("No se encontraron productos")
        }
        if(!existe(shopingCart,"id",scan.id)){
                setShopingCart([...shopingCart,scan])
                setShopingCartSave([...shopingCartSave,scan])
            }
    }
    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////
    const [modalCancelar,setModalCancelar] = useState(false)
    const [modalRegistrar,setModalRegistrar] = useState(false)
    const [modalPay,setModalPay]= useState(false)
    const [wayToPays,setWayToPays] = useState(null)
    const [client,setClient] = useState(null)
    
    
    useEffect(() => {
        if(route.params?.client){
            setClient(route.params.client)
        }
    },[route.params?.client]);
    const limpiar = ()=> {
        setShopingCart([])
        setShopingCartSave([])
        setVenta([])
        setWayToPays(null)
        setClient(null)
    }
        //////////////////////////////////////////////////////////
    //hacer global
    function financial(x) {
        return Number.parseFloat(x).toFixed(2);
    }
    console.log("------------------------")
    /////////////////////////////////////////////////////
    return(
        <div
            className='container-Cobrar'>
                {modalCancelar&&<Modal functionCheckOk={limpiar} setStateModal={setModalCancelar} mensaje={"Limpiar Carro"}/>}
                {modalRegistrar&&<Modal functionCheckOk={registar} setStateModal={setModalRegistrar} mensaje={"Registrar Venta"}/>}
                {modalPay&&<WayToPay functionCheckOk={setWayToPays} setStateModal={setModalPay} />}
           <div className='container2-Cobrar'>
                <button onClick={() => console.log("BucarProductos")} className='buttomAgregar-cobrar'>
                    <Icon path={mdiPlusBox} size={2} color="white" />
                </button>
                {shopingCart.map(item=>
                <div>    
                    <CardProducto
                        key={item.id+"p"}
                        id={item.id}
                        nombre={item.name}
                        categoria={item.category}
                        precio={item.price?financial(item.price):null}
                        product={item} 
                        shopingCart={shopingCart}
                        shopingCartSave={shopingCartSave}
                        setShopingCart={setShopingCart} 
                        venta={venta}
                        setVenta={setVenta}
                    />
                </div>        
                )}
             <div
             className='container3-cobrar'>
                <div className='algo-cobrar'><p className='textTotal-cobrar'>Total</p></div>
                <div className='algo-cobrar'><p className='textTotal-cobrar'>{total}</p></div>
            </div>
            <div className='container4-cobrar'>
                <button 
                   onClick={()=>console.log("Customers",{cobrar:true})}
                >
                    <p className='text-cobrar'>Asignar Cliente</p> 
                </button>

                <button onClick={()=>setModalPay(true)}>
                    <div
                        className='button2-cobrar'><p>Forma de Pago</p>
                    </div>   
                </button>
                </div>
                <div className='container5-Cobrar'>
                    <div
                        className='button2-cobrar'><p>{client?.identifier}</p>
                    </div>                                         
                    <div
                        className='button2-cobrar'><p>{wayToPays}</p>
                    </div>   
                </div>
            </div>
            {/* NavBar() -------------------------------------------*/}
                    <div className = 'containerNavbar-Cobrar'>   
                            <button
                                onClick={() => setModalCancelar(true)}
                            >
                                <Icon path={mdiAutorenew} size={2} color="black" />
                                <p>Limpiar</p>
                            </button>
                            <button 
                                onClick={()=> setModalRegistrar(true)}
                                iconSelect={"cash-register"}
                                buttonSize={30}
                            >
                                <Icon path={mdiCashRegister} size={2} color="black" />
                                <p>Registrar</p>
                            </button>
                    </div> 
               </div>  
        
    );
}
// const styles = StyleSheet.create({
//     container:{
//         marginTop:-15,
//         flex:1,
//         width:width, height:height,
//         alignItems:"center",
//       },
//     contenedorBtonones: {
//         width:"100%",
//         flexDirection: "row",
//         justifyContent: "space-around",  
//     },
//     botonPosition:{
//         zIndex:1,
//         position: "absolute",
//         bottom: height*0.30,
//         right: width*0.1,
//         width: width*0.15,
//         height: height*0.07,
//     },
//     boton:{
//         width: width*0.15,
//         height: height*0.07,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 10,
//         marginVertical: 15,
//         marginHorizontal: 10,
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 12,
//         },
//         shadowOpacity: 0.58,
//         shadowRadius: 16.00,
//         elevation: 24,
//         backgroundColor: "aqua",
        
        
//     },
//     boton2:{
//         width: width*0.30,
//         height: height*0.03,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 10,
//         // marginVertical: 15,
//         // marginHorizontal: 10,
//         // backgroundColor: "aqua",
//     },
//     p:{
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: 'white',   
//         textAlign:"center",            
//     },
//     /* NavBar() -------------------------------------*/
//     textNavBar : {
//         textAlign: "center",
//         fontSize: 14,
//         fontWeight: 'bold',
//         color: 'black',               
//     } ,
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
//           Modal:{
//             zIndex: 10,
//             marginTop: "60%",
//             position: "absolute",
//             width: '90%',
//             marginLeft: '5%',
//             height: "30%",
//             backgroundColor: 'black',
//             justifyContent: 'space-around',
//             alignItems: 'center',
//             paddingHorizontal: 0,
//             elevation: 10,
//             flexDirection: 'column',
//           },
//           modalButtonsContainers:{
//               width: '100%',
//               justifyContent: 'space-around',
//               flexDirection: 'row',
//           },
//           modalContainer:{
//             marginTop:25,
//             zIndex: 10,
//             width: width,
//             height: height,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//           },
//           textTitle : {
//             fontSize: 20,
//             fontWeight: 'bold',
//             color: 'black',            
//           } ,


// })