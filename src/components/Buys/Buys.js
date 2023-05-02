////////////////////////////////////////////////////
import './Buys.css'
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
import { mdiArrowLeft } from '@mdi/js';
import { formatDate } from '../../Firebase/ApiFunctions';

const inconColor =("rgb(52, 51, 72)")
export default function Buys(){
    console.log("------------------------")
    console.log("Ventas")
    const {userProfile,userPermissions} = useAuth()
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
                  {!idProvider&&userPermissions.modifyBuys? <button className='button-MenuProductos' onClick={() => navigate('/newbuy')}>    
                        <Icon path={mdiPlusBox} size={2} color={inconColor} />   
                        <p className='text-button-MenuProductos'>Nueva Compra</p>
                    </button>:null}
                    {idProvider?<button className='button-MenuProductos' onClick={() => navigate(-1)}>    
                      <Icon path={mdiArrowLeft} size={2} color={inconColor} />   
                  </button>:null}
                  </div>
            </div>

        <div className='container-Buys'>
            {!idProvider&&<input
                    className='textInput-Buys'
                    onChangeText={(e) => filtroBusqueda(e)}
                    value={filterBySearch}
                    placeholder="Buscar compra..."
                /> }                      
            
            <div className='lista-Buys'>
                <p className='text-Buys'>Nro Compra</p>
                <p className='text-Buys'>Total</p>
                <p className='text-Buys'>Fecha </p>
            </div>
            <div className='container2-Buys'>
            {!salesApi?<Loading/>:
            dataRender.map(item=>
                <button 
                    className='buttonCard-Buys'
                    onClick={() => navigate("/buyresumen",{state:item})}>  
                    <CardVenta
                        key={item.id+"p"}
                        id={item.id}
                        total={item.total?financial(item.total):null}
                        fecha={formatDate(item.createdDate).formatDate+" / "+formatDate(item.createdDate).hora}
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

