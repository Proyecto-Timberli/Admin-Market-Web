import './Menu-Products.css'
import React, { useState } from 'react';
import {useAuth} from '../../Context/authContext'
import Icon from '@mdi/react';
import {useNavigate } from 'react-router-dom';
import { mdiMagnifyExpand } from '@mdi/js';
import { mdiShape } from '@mdi/js';
import { mdiPlusBox } from '@mdi/js';
import Products from './Menu-Productos'

const inconColor =("rgb(52, 51, 72)")
export default function MenuProductos(){
    const {userPermissions} = useAuth() 
    const navigate = useNavigate()
    return(
        <div className='container-MenuProductos'>
            <div className='imgBackGroundCustom'></div>
            <div className='container-nav-MenuProductos'>
                
                {userPermissions?.modifyProducts&&
                <div className='button-Container-MenuProductos'>
                    <button className='button-MenuProductos' onClick={() => navigate('newCategory')}>    
                        <Icon path={mdiShape} size={2} color={inconColor} />   
                        <p className='text-button-MenuProductos'>Categorias</p>
                    </button>
                </div>}
                
                {userPermissions?.modifyProducts&&
                <div className='button-Container-MenuProductos'>
                    <button className='button-MenuProductos' onClick={() => navigate('addproduct')}>    
                        <Icon path={mdiPlusBox} size={2} color={inconColor} />   
                        <p className='text-button-MenuProductos'>Agregar Producto</p>
                    </button>
                </div>}
            </div>
            <div className='container-screen-MenuProducts'>
                <Products/>
            </div>
        </div>
    );
    
}

