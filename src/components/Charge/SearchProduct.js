import './SearchProducts.css'
import React, { useEffect, useState } from "react";
////////////////////////////////////////////////////
import {useAuth} from '../../Context/authContext'
import {getFirestore, collection, getDocs} from 'firebase/firestore';
////////////////////////////////////////////////////
import CardProduct from "./CardProduct";
import Loading from '../Reusables/Loading'

////////////////////////////////////////////////////
import {useNavigate } from 'react-router-dom';

import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import SelectComponent from '../Reusables/Select'
////////////////////////////////////////////////////
////////////////////////////////////////////////////


const SearchProducts = ({setRoute,setSearchProductsState}) => {
  console.log("------------------------")
  console.log("SearchProducts")
   /////////////////////////////////////////////////////
    const {userProfile} = useAuth() 
    const navigate = useNavigate()
  /////////////////////////////////////////////////////
    const [productsApi,setProductsApi]=useState(null)
    
    const getProducts =  ()=>{
      const selectedC = collection(getFirestore(), "users/"+userProfile+"/products")
        getDocs(selectedC)
        .then(res => setProductsApi(res.docs.map(product=>({id:product.id,...product.data()})
        )))
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        })
    }
   
    useEffect(() => {
      getProducts()
    },[]);
    let arrayAMostrar = productsApi;
    /////////////////////////////////////////////////////
    const [etiquetaSelect,setEtiquetaSelect]= useState({name:'Ninguna'})
    const [categoriesApi,setCategoriesApi]= useState([])
    const getCategories =  ()=>{
      const selectedC = collection(getFirestore(), "users/"+userProfile+"/categories")
        getDocs(selectedC)
        .then(res => setCategoriesApi(res.docs.map(category=>({id:category.id,...category.data()}))))
    }
    useEffect(() => {
        getCategories()
    },[]);
  ////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  //Funcion Filtro Scann
  const [scannOn,setScannOn]=useState(false)
  const [filterScanned,setFilterScanned]=useState(null)
  function filtroScann(code) {
    if (!productsApi){return} 
    if (!code){return setFilterScanned(null)}
    return (
      setFilterScanned(productsApi.filter((e) =>e.barCode && e.barCode.includes(code)))     
    )
  }
  if (filterScanned){
      arrayAMostrar=filterScanned
  }
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
   //Funcion Filtro catgorias
   useEffect(() => {
    filtroCategory(etiquetaSelect)
  },[etiquetaSelect]);
  const [filtroCategoria,setFiltroCategoria]= useState(null)
  function filtroCategory(category) {
    if (!productsApi){return} 
    if (!category){return setFiltroCategoria(null)}
    if (category.name==='Ninguna'){return setFiltroCategoria(null)}
    return (
      setFiltroCategoria(productsApi.filter((e) =>e.category && e.category.includes(category.name)))     
    )
  }
  if (filtroCategoria){
    arrayAMostrar=filtroCategoria
  }
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
  let filtro = filtroName(arrayAMostrar, filterBySearch, "name");
  const filtroBusqueda = function (e) {
    setFilterBySearch(e);
  };
  if (filterBySearch !== "") {
    arrayAMostrar = filtro;
  }
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  // configuracion ModificarVarios
  const [seleccionarVarios,setSeleccionarVarios] = useState(false);
  const [arraySeleccionados,setArraySeleccionados]= useState([]);
  useEffect(() => {
    if(!arraySeleccionados.length){
      setSeleccionarVarios(false)
    }
  },[arraySeleccionados]);
  /////////////////////////////////////////////////////
  const onLongPressHandler=(params)=>{
    if(!seleccionarVarios){
      setSeleccionarVarios(true)
    }
    if(arraySeleccionados.includes(params)){
      setArraySeleccionados(arraySeleccionados.filter(select=>select!==params))
    }
    else{
      setArraySeleccionados([...arraySeleccionados,params])
    }
  }
  const [selectProduct,setSelectProduct]=useState(null)
  const [productInfo,setProductInfo]=useState(false)
  const onPressHandler=(params)=>{
    setSelectProduct(params)
    setProductInfo(true)
  }
  console.log("------------------------")
  //////////////////////////////////////////////////////////
 
   //Reflejar Stock
    function addToCart(product){
        setRoute({params: { products: product}})
        setSearchProductsState(false)
    }
   /////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
  //hacer global
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }/////////////////////////////////////////////////
  
    return (
        <div className='modal-searchProducts'>
           <div className = 'container-nav-MenuProductos'>              
                  <div className='button-Container-MenuProductos'>
                        <button  className='button-MenuProductos' onClick={() => setSearchProductsState(false)}>
                          <Icon path={mdiArrowLeft} size={2} color='rgb(52, 51, 72)'/>
                          <p className='text-button-MenuProductos'></p>
                        </button>
                  </div>
            </div>
        
        <div className='container-searchProducts'>
          <div className="container-products"> 
            <div className='caja-products'>
                <input
                className='textInput-products'
                onChange={(e) => filtroBusqueda(e.target.value)}
                value={filterBySearch}
                placeholder="Buscar..."
                />
              
              <SelectComponent
              text={'Selecciona una etiqueta'}
              text2={etiquetaSelect.name}
              arraySelects={[...categoriesApi,{id:'Ninguna',name:'Ninguna'}
              ]}
              selectFunction={setEtiquetaSelect}
            />
            </div>
            <div className='container-cardProducts-MenuProducts'>
              {!productsApi?<Loading/>:<>
              
              {arrayAMostrar.map(item=>
                  <div className='button-cardProduct-Products-container'>
                          <CardProduct
                                  key={item.id}
                                  id={item.id}
                                  nombre={item.name}
                                  categoria={item.category?item.category:null}
                                  precio={item.price?financial(item.price):null}
                                  product={item}
                                  onPress={addToCart}
                          />
                  </div> 
                  )}
                  </>}
            </div>
          </div>
        </div>
        </div>
    );
  
};
export default SearchProducts;
