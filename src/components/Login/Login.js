import './Login.css'
import React, { useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom';
import {ButtonLogin} from './ButtonLogin'
import {ButtonLoginGoogle} from './ButtonLogin'
import {useAuth} from '../../Context/authContext'
// import validateForm from '../register/validation.js';

function Login(){
  console.log("------------------------")
  console.log("Login")
 
  //////////////////////////////////////////////////////////////
  const {login, loginWithGoogle, user} = useAuth()
  //////////////////////////////////////////////////////////////
  // const initalState = null
  
  const [state, setState] = useState({
    email: "",
    password: "ss",
  });
//   const [formErrors, setFormErrors] = useState({ 
//     error: "" ,
//     email: "",
//     password: "",
//   })
  
  const navigate = useNavigate()
  

  const handleChangeText = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
//   const handleInputOnBlur = (e) => {
//     setFormErrors({
//         ...formErrors,
//         [e.target.name]: validateForm(formData)[e.target.name],
//     });
//   }
  const handleSubmit = async () => {
      try{
        await login(state.email, state.password)
        
        navigate('/starting')
      }
      catch(error){
        console.log(error)
      }
      
  };
  const handleGoogleLogin = async () => {
      try{
        await loginWithGoogle()
        return navigate('/starting')
      }
      catch(error){
        console.log(error.message)
      }
  }

  useEffect(() => {
    if (user){
      navigate('/starting')
    }
  },[user])


 

  console.log("------------------------")

    return (
        <div className="container-login"> 
            <h1 className="title-login">Hola!</h1>
            <h2 className="sub-title-login">Logea con tu cuenta</h2>
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
            <ButtonLogin onPress={handleSubmit}/>
            <ButtonLoginGoogle onPress={handleGoogleLogin}/>

            <button onClick={()=>navigate('/register')}className="text-login">No tengo cuenta!</button>
        </div>
    )
}

export default Login;