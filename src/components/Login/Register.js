import './Login.css'
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {ButtonRegister} from './ButtonLogin'
import {useAuth} from '../../Context/authContext'
// import validateForm from '../register/validation.js';

function Register(){
    
    const navigate = useNavigate()
    const initalState = {
        email: "",
        password: "",
      };
    
      const [state, setState] = useState(initalState);
    
      const handleChangeText = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
      };
      const {signup} = useAuth()
      const handleSubmit = async () => {
        try{
          await signup(state.email, state.password)
          navigate("/login")
        }
        catch(error){
          console.log(error.message)
        }
        
      };
  
    return (
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
              <input 
                className="text-input-login" 
                type='password'
                // secureTextEntry={true}
                placeholder="Repita su contraseña" 
                // onBlur={handleInputOnBlur}
            />
            <ButtonRegister onPress={handleSubmit}/>

            <button onClick={()=>navigate('/login')}className="text-login">Ya tengo cuenta!</button>
        </div>
    )
}

export default Register;