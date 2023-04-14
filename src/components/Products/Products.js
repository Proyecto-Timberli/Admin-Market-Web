import './Menu-Products.css'
import React, { useState } from 'react';
import {useAuth} from '../../Context/authContext'
import Icon from '@mdi/react';
import {useNavigate } from 'react-router-dom';
import { mdiMagnifyExpand } from '@mdi/js';
import { mdiShape } from '@mdi/js';
import { mdiPlusBox } from '@mdi/js';
import Products from './Menu-Productos'
import AgregarUno from './Agregar-uno';
import NuevaCategoria from './Nueva-Categoria'
const inconColor =("rgb(52, 51, 72)")
export default function MenuProductos(){
    console.log("------------------------")
    console.log("MenuProductos")
    console.log("------------------------")
    const {userPermissions} = useAuth() 
    const navigate = useNavigate()
    const [screen, setScreen] = useState('Products')
    return(
        <div className='container-MenuProductos'>
            <div className='imgBackGroundCustom'></div>
            <div className='container-nav-MenuProductos'>
                <div className='button-Container-MenuProductos'>
                    <button  className='button-MenuProductos' onClick={() => setScreen('Products')}>    
                        <Icon path={mdiMagnifyExpand} size={2} color={inconColor} />   
                        <p className='text-button-MenuProductos'>Buscar Producto</p>
                    </button>
                </div>
                {true?
                // userPermissions.modifyProducts?
                <div className='button-Container-MenuProductos'>
                    <button className='button-MenuProductos' onClick={() => setScreen('Categorias')}>    
                        <Icon path={mdiShape} size={2} color={inconColor} />   
                        <p className='text-button-MenuProductos'>Categorias</p>
                    </button>
                </div>:<div className='button-Container-MenuProductos'></div>}
                {true?
                // userPermissions.modifyProducts?W
                <div className='button-Container-MenuProductos'>
                    <button className='button-MenuProductos' onClick={() => setScreen('Agregar Producto')}>    
                        <Icon path={mdiPlusBox} size={2} color={inconColor} />   
                        <p className='text-button-MenuProductos'>Agregar Producto</p>
                    </button>
                </div>:<div className='button-Container-MenuProductos'></div>}
            </div>
            <div className='container-screen-MenuProducts'>
                {screen==='Products'&&<Products/>}
                {screen==='Agregar Producto'&&<AgregarUno/>}
                {screen==='Categorias'&&<NuevaCategoria/>}
            </div>
        </div>
    );
}

