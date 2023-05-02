
import React, { useEffect, useState } from "react";
import CardProvider from "./CardProvider";
import {useAuth} from '../../Context/authContext'
import {getFirestore, collection, getDocs} from 'firebase/firestore';
import Loading from '../Reusables/Loading'
import { useLocation, useNavigate } from 'react-router';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

const Providers= ({desde,functionModal,setModalClient}) => {
  console.log("------------------------")
  console.log("Providers")
  const route ={params:null}
  const {userPermissions} = useAuth() 
  const {userProfile} = useAuth()
  const [customersApi,setCustomersApi]= useState(null)
  const locate = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
      const selectedC = collection(getFirestore(), "users/"+userProfile+"/providers")
      getDocs(selectedC)
      .then(res => setCustomersApi(res.docs.map(client=>({id:client.id,...client.data()}))))
  },[])

  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  let arrayAMostrar = customersApi;
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  //Funcion Busqueda Nombre
  function filtroName(array, search, attibute) {
    if (!array){return} 
    return array.filter(
      (e) =>
        e[attibute] && e[attibute].toLowerCase().includes(search.toLowerCase())
    );
  }
  const [filterBySearch, setFilterBySearch] = useState("");
  let filtro = filtroName(arrayAMostrar, filterBySearch, "identifier");
  const filtroBusqueda = function (e) {
    setFilterBySearch(e);
  };
  if (filterBySearch !== "") {
    arrayAMostrar = filtro;
  }
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  const [IdSelect, setIdSelect] = useState(null);
 
  const onPressHandler=(params)=>{
   
    setIdSelect(params.id)
    console.log("Navigate Client-info","{...params}")
    console.log(params)
    navigate("providerinfoedit",{state:{...params}})
    
    
  }
  /////////////////////////////////////////////////////
  console.log("------------------------")
  
    return (
        <div className='modal-container-Customers'>
          <div className='imgBackGroundCustom'></div>
          {desde&&<div className = 'container-nav-MenuProductos'>              
                  <div className='button-Container-MenuProductos'>
                        <button  className='button-MenuProductos' onClick={() => setModalClient(false)}>
                          <Icon path={mdiArrowLeft} size={2} color='rgb(52, 51, 72)'/>
                          <p className='text-button-MenuProductos'></p>
                        </button>
                  </div>
        </div>}
        <div className='container-Customers'>
          <div className='caja-Customers'>
            <input
            className='textInput-Customers'
            onChange={(e) => filtroBusqueda(e)}
            value={filterBySearch}
            placeholder="Buscar provedor..."
            />
            {userPermissions?.modifyProviders?
            <button onClick={()=>navigate("addProvider")}
                className='button-Customers'> 
                <p className = 'textButton-Customers'>Agregar provedor</p>
            </button>
            :null} 
            <div className='container2-Customers'>
              <p className='text-customer'>Provedor</p>
              <p className='text-customer'>Telefono</p>
              <p className='text-customer'>Direccion</p>
            </div>
          </div>
          {!customersApi?<Loading/>:
            arrayAMostrar.map(item => 
                <button
                  className='buttonCard-Customers'
                    onClick={desde==='charge'?()=>functionModal({id:item.id,identifier:item.identifier}): () => onPressHandler(item)}>
                  <CardProvider
                    key={item.id}
                    id={item.id}
                    nombre={item.identifier}
                    telefono={item.phone}
                    direccion={item.location}
                  />
                </button> )
        }
        </div>
        </div>
    );
  
};



export default Providers;




