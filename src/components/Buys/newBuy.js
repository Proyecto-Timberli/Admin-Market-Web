////////////////////////////////////////////////////
import React, {useEffect, useState } from "react";
import '../Charge/Charge.css'
////////////////////////////////////////////////////
import {useAuth} from '../../Context/authContext'
import {getFirestore,getDocs, collection,doc,Timestamp} from 'firebase/firestore';
import {postFirestore,putFirestore} from '../../Firebase/ApiFunctions'
////////////////////////////////////////////////////
import {Modal} from '../Reusables/Modal'
////////////////////Colors//////////////////////////
import CardProducto from './Card-Product-In-Cart'

import SearchProducts from './SearchProduct'

import Providers from '../Providers/Providers'



import Icon from '@mdi/react';
import { mdiCashRegister, mdiCheckboxMarked } from '@mdi/js';
import { mdiCloseBox } from '@mdi/js';
import { mdiPlusBox } from '@mdi/js';
import { mdiAutorenew } from '@mdi/js';
import { mdiArrowLeft } from '@mdi/js';
import { mdiMagnifyExpand } from '@mdi/js';
import { mdiShape } from '@mdi/js';
import { useNavigate } from "react-router";


import imagenCart from '../../assets/buyCart.png'

const inconColor =("rgb(52, 51, 72)")


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
export default function NewBuy(){
    console.log("------------------------")
    console.log("NewBuy")
    /////////////////////////////////////////////////////
    const navigate = useNavigate()
    const[route,setRoute]=useState({params:null});

    /////////////////////////////////////////////////////
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
    useEffect(() => {
        console.log('cambios en shopingCart')
        console.log(shopingCart)
    },[shopingCart])
    /////////////////////////////////////////////////////
    useEffect(() => {
        console.log('cambios en route')
        if (route.params?.products) {
            if(!existe(shopingCart,"id",route.params?.products.id)){
                console.log('no existe producto')
                setShopingCart([...shopingCart,route.params.products])
                setShopingCartSave([...shopingCartSave,route.params.products])
                console.log('agregando...')
            }
        }
    }, [route]);
   
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
        const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/buys")
        postFirestore(selectedCollection,data)
    }

    
    
    function registar(ventar=venta, productos=shopingCart){
        if(!ventar[0]){
            alert("No hay compra para registrar")
        }else{
            let postVentar =  {
                idProvider:client?.id?client.id:null,
                provider:client?.identifier?client.identifier:null,
                total:total,
                buyProducts:ventar,
                createdDate:Timestamp.now().toDate().toString(),
                wayToPay:wayToPays?wayToPays:null
            }
            console.log(postVentar)
            console.log(productos)
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
    const [modalClient,setModalClient] = useState(false)
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
    const [searchProductsState,setSearchProductsState] =useState(false)
    /////////////////////////////////////////////////////
    const functionModal= (item)=>{
        setClient(item)
        setModalClient(false)
    }
    return(
        <>
         <div className='modal-container-Customers'>
            <div className='imgBackGroundCustom'></div>
            {!searchProductsState&& <div className = 'container-nav-MenuProductos'>              
                  <div className='button-Container-MenuProductos'>
                    <button className='button-MenuProductos' onClick={() => navigate('/buys')}>    
                        <Icon path={mdiArrowLeft} size={2} color={inconColor} />   
                    </button>
                  </div>
            </div>}
        {searchProductsState&&<div className='modaldiv-Cobrar'><SearchProducts setRoute={setRoute} setSearchProductsState={setSearchProductsState}/></div>}
        {modalCancelar&&<Modal functionCheckOk={limpiar} setStateModal={setModalCancelar} mensaje={"Limpiar Carro"}/>}
        {modalRegistrar&&<Modal functionCheckOk={registar} setStateModal={setModalRegistrar} mensaje={"Registrar Venta"}/>}
        {modalPay&&<WayToPay functionCheckOk={setWayToPays} setStateModal={setModalPay} />}
        {modalClient&&<div className='modaldiv-Cobrar'><Providers desde={'charge'} functionModal={functionModal} setModalClient={setModalClient}/></div>}
        <div className={(modalCancelar||modalRegistrar||modalPay||modalClient||searchProductsState)?'container-Cobrar oculto':'container-Cobrar'  }>
            <div className='container2-Cobrar'>
                <div className='container4-cobrar'>
                    <div className="container5-cobrar">
                        <button 
                            className='button2-cobrar'
                            onClick={()=>setModalClient(true)}>
                            <p className='text-cobrar'>Asignar Provedor</p> 
                        </button>

                        <div
                            className='button3-cobrar'><p className='text2-cobrar'>{client?.identifier}</p>
                        </div>  
                    </div>
                    <div className="container5-cobrar">
                        <button 
                            className='button2-cobrar'
                            onClick={()=>setModalPay(true)}>
                            <p className='text-cobrar'>Forma de Pago</p>  
                        </button>

                            <div
                                className='button3-cobrar'><p className='text2-cobrar'>{wayToPays}</p>
                            </div> 
                    </div>  
                </div>
                
                <div className = 'containerNavbar-Cobrar'>   
                            <button 
                                className = 'buttonNavbar-Cobrar'
                                onClick={() => setModalCancelar(true)}>
                                <Icon path={mdiAutorenew} size={2} inconColor />
                                <p className="textNavBar-cobrar">Limpiar</p>
                            </button>
                            <button 
                                className = 'buttonNavbar-Cobrar'
                                onClick={()=> setModalRegistrar(true)}
                                iconSelect={"cash-register"}
                                buttonSize={30}>
                                <Icon path={mdiCashRegister} size={2} color={inconColor} />
                                <p className="textNavBar-cobrar">Registrar</p>
                            </button>
                </div> 
                <div className="totalAgregar-cobrar">
                    <div
                        className='container3-cobrar'>
                        <p className='textTotal-cobrar'>Total</p>
                        <p className='textTotal-cobrar'>{total}</p>
                    </div>
                    <button onClick={() => setSearchProductsState(true)} className='buttomAgregar-cobrar'>
                        <Icon path={mdiPlusBox} size={2} color={inconColor} />
                    </button>
                </div>
            </div>
                {/* NavBar() -------------------------------------------*/}
            <div className="container-cart" >
                <img className='BuyCartImage-Charge'src={imagenCart}/>
                    {shopingCart.map(item=>
  
                        <CardProducto
                            key={item.id+"p"}
                            id={item.id}
                            nombre={item.name}
                            categoria={item.category}
                            precio={item.buyprice?financial(item.buyprice):null}
                            product={item} 
                            shopingCart={shopingCart}
                            shopingCartSave={shopingCartSave}
                            setShopingCart={setShopingCart} 
                            venta={venta}
                            setVenta={setVenta}
                        />

     
                    )}
            </div>
        </div> 
        </div>
        </>
    );
}
