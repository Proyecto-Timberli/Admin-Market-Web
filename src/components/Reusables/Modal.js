import './Modal.css';
import Icon from '@mdi/react';
import React, {useState } from "react";
import { mdiCheckboxMarked } from '@mdi/js';
import { mdiCloseBox } from '@mdi/js';


export function Modal({functionCheckOk, setStateModal,mensaje}){
  function checkOk(){
    functionCheckOk()
    setStateModal(false)
  }
  function exit(){
    setStateModal(false)
  }
  return (
    <div className='modalContainer-agregarUno'>
    <div 
      className='modal'>
        <p>{mensaje}</p>
      <div className='modalButtonsContainers'>
        <button onClick={()=>checkOk()}><Icon path={mdiCheckboxMarked} size={2} color="green"/></button> 
        <button onClick={()=>exit()}><Icon path={mdiCloseBox} size={2} color="red" /></button> 
      </div> 
    </div>
    </div>
  )
}

export function ModalInput({dato, state, setState, stateModal}){
  const [editado, setEditado]=useState(state[dato])
  function modalHandler(e){
    setEditado(e)
  }
  function checkOk(){
    setState({
      ...state,
      [dato]:editado
    })
    stateModal(false)
  }
  function exit(){
    stateModal(false)
  }
  return (
    <div className='modalContainer-agregarUno'>
    <div 
      className='modal'>
      <input
            className='textInput-modal'
            onChange={(e) => modalHandler(e)}
            value={editado?.toString()}
          />
      <div className='modalButtonsContainers'>
        <button onClick={()=>checkOk()}><Icon path={mdiCheckboxMarked} size={2} color="green"/></button> 
        <button onClick={()=>exit()}><Icon path={mdiCloseBox} size={2} color="red" /></button> 
      </div> 
    </div>
    </div>
  )
}