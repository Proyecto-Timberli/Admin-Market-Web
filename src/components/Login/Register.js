import './Login.css'
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {ButtonRegister} from './ButtonLogin'
import {useAuth} from '../../Context/authContext'
// import validateForm from '../register/validation.js';
export function validate(input) {
  let errors = {};
  if (!input.email) {
    errors.email = '*ingresa un email'
  // }else if (emailRegex.test(input.email)){
  //   errors.email = '*formato incorrecto'
  }
  if (!input.password){
    errors.summary = '*ingresa una contraseña'
  }else if (input.password.length < 6){
    errors.password = '*debe contener al menos 6 caracteres'
  }else if (input.password.length > 60){
    errors.password = '*no puede contener mas de 60 caracteres'
  }
  if(input.passwordCopia !== input.password){
    errors.passwordCopia = '*contraseña incorrecta'
  }
  
  return errors;
};
function Register(){
  const [formErrors, setFormErrors] = useState(false)
    const navigate = useNavigate()
    const initalState = {
        email: "",
        password: "",
        passwordCopia: "",
      };
      const [state, setState] = useState(initalState);
    useEffect(()=>{
        console.log(state)
    },[state])
    
      const handleChangeText = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
      };
      const {signup} = useAuth()
      const handleSubmit = async () => {
        try{
          setFormErrors(true)
          if(Object.keys(validate(state)).length){
            console.log(validate(state))
          }else{
            console.log('cearndo....')
            let create = null
            create = await signup(state.email, state.password)
            if(Object.keys(create)[0]==='error'){
              setFormErrors(create)
            }else if(Object.keys(create)[0]==='successful'){
              navigate("/login")
            }
          }  
          
        }
        catch(error){
          setFormErrors('no se pudo registrar la cuenta')
        }
        
      };
  
    return (
      <div className='container1-login'>
        <div className="container-login"> 
            <h1 className="title-login">Hola!</h1>
            <h2 className="sub-title-login">Registra tu cuenta</h2>
            <input 
                className="text-input-login" 
                type='text'
                name='email'
                value={state.email}  
                placeholder="Ingresa un email" 
                onChange={handleChangeText}
                // onBlur={handleInputOnBlur}
            />
             <div className='redError-container'>{validate(state).email&&formErrors&&<p className='redError'>{validate(state).email}</p>}</div>
            <input 
                className="text-input-login" 
                type='password'
                name='password'
                value={state.password}  
                // secureTextEntry={true}
                placeholder="Ingresa una contraseña" 
                onChange={handleChangeText}
                // onBlur={handleInputOnBlur}
            />
             <div className='redError-container'>{validate(state).password&&formErrors&&<p className='redError'>{validate(state).password}</p>}</div>
              <input 
                className="text-input-login" 
                type='password'
                name='passwordCopia'
                onChange={handleChangeText}
                // secureTextEntry={true}
                placeholder="Repita su contraseña" 
                // onBlur={handleInputOnBlur}
            />
             <div className='redError-container'>{validate(state).passwordCopia&&formErrors&&<p className='redError'>{validate(state).passwordCopia}</p>}</div>
             {Object.keys(formErrors)[0]==='error'&&<div className='redError-container'><p className='redError'>{formErrors.error}</p></div>}
            <ButtonRegister onPress={handleSubmit}/>

            <button onClick={()=>navigate('/login')}className="text-login">Ya tengo cuenta!</button>
        </div>
      </div>
    )
}

export default Register;