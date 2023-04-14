////////////////////////////////////////////////////
import './Sells.css'
import React, {useEffect, useState } from "react";
////////////////////////////////////////////////////
import {useAuth} from '../../Context/authContext'
import {getFirestore, collection, getDocs, Timestamp} from 'firebase/firestore';
import Loading from '../Reusables/Loading'
import CardVenta from './CardSell'
import { useNavigate } from 'react-router';
import {useLocation} from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiPlusBox } from '@mdi/js';
const inconColor =("rgb(52, 51, 72)")
export default function Buys(){
    console.log("------------------------")
    console.log("Ventas")
    const {userProfile} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    //////////////////////filtro por cliente///////////////////////////////

    const idProvider = location.state? location.state : null
    ////////////////////conexion Api////////////////////////////
    const [salesApi,setSalesApi]=useState(null)
    const getVentas =  ()=>{
      const selectedC = collection(getFirestore(), "users/"+userProfile+"/buys")
        getDocs(selectedC)
        .then(res => setSalesApi(res.docs.map(sale=>({id:sale.id,...sale.data()}))))
    }
    useEffect(() => {
        if(userProfile){
           getVentas()
        }
    },[])
    let dataRender = []
    if(idProvider){
        dataRender= salesApi?.filter(sale=> sale.idProvider===idProvider)
    }else{
        dataRender = salesApi
    }
    /////////////////////////////////////////////////////
    
    
    function filtroName(array, search, attibute) {
        if (!array){return} 
        return array.filter(
        (e) =>
            e[attibute] && e[attibute].toLowerCase().includes(search.toLowerCase())
        );
    }
    const [filterBySearch, setFilterBySearch] = useState("");
    let filtro = filtroName(salesApi, filterBySearch, "id");
    const filtroBusqueda = function (e) {
        setFilterBySearch(e);
    };

    if (filterBySearch !== "") {
        dataRender=filtro
    }
   /////////////////////////////////////////////////////
    //hacer global
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

   console.log("------------------------")
   /////////////////////////////////////////////////////
    return(
        <div className='modal-container-Customers'>
            <div className='imgBackGroundCustom'></div>
            <div className = 'container-nav-MenuProductos'>              
                  <div className='button-Container-MenuProductos'>
                    <button className='button-MenuProductos' onClick={() => navigate('/newbuy')}>    
                        <Icon path={mdiPlusBox} size={2} color={inconColor} />   
                        <p className='text-button-MenuProductos'>Nueva Compra</p>
                    </button>
                  </div>
            </div>

        <div className='container-Sells'>
            {!idProvider&&<input
                    className='textInput-Sells'
                    onChangeText={(e) => filtroBusqueda(e)}
                    value={filterBySearch}
                    placeholder="Buscar compra..."
                /> }                      
            
            <div className='lista-Sells'>
                <p className='text-Sells'>Nro Compra</p>
                <p className='text-Sells'>Total</p>
                <p className='text-Sells'>Fecha </p>
            </div>
            <div className='container2-Sells'>
            {!salesApi?<Loading/>:
            dataRender.map(item=>
                <button 
                    className='buttonCard-Sells'
                    onClick={() => navigate("/sellresumen",{state:item})}>  
                    <CardVenta
                        key={item.id+"p"}
                        id={item.id}
                        total={item.total?financial(item.total):null}
                        fecha={item.createdDate}
                        resumen={item.sellProducts}
                        // client={item.client}
                        // idClient={item.idClient}
                        // wayToPay={item.wayToPay}
                    />
                </button> )}
            </div>     
        </div>   
        </div>
    )

}

