
import './ModificarVarios.css'
////////////////////////////////////////////////////
import React, { useState } from "react";
////////////////////////////////////////////////////
import {useAuth} from '../../Context/authContext'
import {getFirestore, doc} from 'firebase/firestore';
import {putFirestore, deleteFirestore} from '../../Firebase/ApiFunctions'
////////////////////////////////////////////////////
import Icon from '@mdi/react';
import { mdiCheckboxBlankOutline } from '@mdi/js';
import { mdiCheckboxMarkedOutline } from '@mdi/js';
import { mdiContentSave } from '@mdi/js';
import { mdiArrowLeft } from '@mdi/js';

import Loading from '../Reusables/Loading'

function ModalLoading(){
    return (
      <div className="modalContainer">
      <Loading/>
      </div>
    )
}

export default function ModificarVarios({estado,listaSeleccionados,setListaSeleccionados,listaCompleta,recargarLista,navigation}){
    const {userProfile} = useAuth()
    const [todos,setTodos]=useState(false)// check todos
    const [visible,setVisible]=useState(false)// modal on o off
    const [aumentar,setAumentar]=useState(true)// aumentar o bajar precios
    const [valor,setValor]=useState(0)// valor input
    const handleChangeInput=(e)=>{
        setValor(e.target.value)
    }
    const [listaFinalGuardada,setListaFinalGuardada]=useState(null)// lista modificada
    const [loading,setLoading]=useState(false)// Loading al guardar cambios
    
    function checkTodos(){
        if (!todos){
            setTodos(true)
            setListaSeleccionados(listaCompleta)
        }else{setTodos(false)
            setListaSeleccionados([])}
    }
    function listaFinal(){
        if(!valor){return}
        if(aumentar){
            return setListaFinalGuardada(listaSeleccionados.map(e=>e={...e,price:Math.floor(e.price)+(e.price*(valor/100))}))
        }
        if(!aumentar){ 
            return setListaFinalGuardada(listaSeleccionados.map(e=>e={...e,price:Math.floor(e.price)-(e.price*(valor/100))}))
        }
    }

    const putProducts = (data)=>{
        data.forEach(product=>{
            const selected = doc(getFirestore(), "users/"+userProfile+"/products", product.id)
            putFirestore(selected,product)
        });
    }
      
    function aplicar(){
        if (!valor){return}
        listaFinal()
        setValor(0)
        alert("Se aplicaron los cambios","Para confirmar los cambios presione el boton GUARDAR")
        
    }
    function salir(){
        setListaFinalGuardada(null)
        setValor(0)
        setVisible(false)
    }
    function guardar(){
        if (!listaFinalGuardada){return}
        setLoading(true)
        let productos = listaFinalGuardada
        setListaFinalGuardada(null)
        setValor(0)
        putProducts(productos)
        setTimeout(() => {recargarLista()
            setTodos(false)
            setListaSeleccionados([])
            setLoading(false)
            setVisible(false)
            alert("Cambios guardados")}, 1000);

    }

  
    return(
        <> 
            
                {estado&&
                    <button className='buttonTodos' onClick={()=>checkTodos()}>
                        <p className='texto-ModificarVarios'>Todos</p>
                        {!todos&&<Icon path={mdiCheckboxBlankOutline} size={1} color={'white'}/>}
                        {!!todos&&<Icon path={mdiCheckboxMarkedOutline} size={1} color={'white'}/>}
                    </button>}
                
                {!!listaSeleccionados.length&&
                    <button className='buttonTodos'onClick={()=>setVisible(true)}>
                        <p className='texto-ModificarVarios' >Modificar</p>
                    </button>
                } 
                
            {visible&&<div className='modal-ModificarVarios'>
                {loading&&<ModalLoading/>}
                
                    
                        {/* Opciones aumentar bajar() -------------------------------------*/}
                        <div className='container2-ModificarVarios'>               
                            <button onClick={()=>setAumentar(true)}  className={!aumentar?'botonOpciones-ModificarVarios':'botonOpcionesColor-ModificarVarios'}>                              
                                <p className={!!aumentar?'texto2colorwhite-modificarVarios':'texto2-modificarVarios'}>Aumentar precios</p>                               
                            </button>      
                            
                            <button onClick={()=>setAumentar(false)} className={!!aumentar?'botonOpciones-ModificarVarios':'botonOpcionesColor-ModificarVarios'}>
                                <p className={!aumentar?'texto2colorwhite-modificarVarios':'texto2-modificarVarios'}>Bajar precios</p>                                
                            </button>    
                        </div>
                        {/* entrada porcentaje() -------------------------------------*/}
                        <div className='container3-ModificarVarios'>
                            <input
                                className='inputPorcentaje-ModificarVarios'
                                onChange={(e) =>handleChangeInput(e)}
                                value={valor}
                                placeholder="0"
                            />
                            <button
                            
                                    className='botonOpciones-ModificarVarios'>
                                    <p className='texto2-ModificarVarios'>%</p>
                             
                            </button>
                        </div>
                        {/* button Aplicar() -------------------------------------*/}
                        <button onClick={()=> aplicar()} className={!valor?'botonOpciones-ModificarVarios':'botonOpcionesColor-ModificarVarios'}>
                            <p className={valor?'texto2colorwhite-modificarVarios':'texto2-modificarVarios'}>Aplicar</p>                         
                        </button>  
                        {/* button listaFinal() ---------------------------------*/}
                        <button onPress={()=>console.log(listaFinalGuardada)} className={!listaFinalGuardada?'botonOpciones-ModificarVarios':'botonOpcionesColor-ModificarVarios'}>                           
                            <p className={listaFinalGuardada?'texto2colorwhite-modificarVarios':'texto2-modificarVarios'}>Ver lista final</p>   
                        </button>
                        {/* NavBar() -------------------------------------------*/}
                        <div className = 'containerNavBar-ModificarVarios'>   
                            <button onClick={()=>salir()} className='buttonNavBar-ModificarVarios'>
                                <Icon path={mdiArrowLeft} size={2} />
                                <p>Salir</p>
                            </button>
                            <button onClick={()=>guardar()} className='buttonNavBar-ModificarVarios'>
                                <Icon path={mdiContentSave} size={2} color={"black"}/>
                                <p>Guardar</p>
                            </button>
                        </div>                  
                    
                
            </div>}
        </>
    )
}
