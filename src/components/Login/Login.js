import './Login.css'
import React, { useEffect, useState } from "react";
import {useLocation, useNavigate } from 'react-router-dom';
import {ButtonLogin} from './ButtonLogin'
import {ButtonLoginGoogle} from './ButtonLogin'
import {useAuth} from '../../Context/authContext'
// import validateForm from '../register/validation.js';

function Login({}){
  console.log("------------------------")
  console.log("Login")
 
  //////////////////////////////////////////////////////////////
  const {user} = useAuth()
  //////////////////////////////////////////////////////////////
  // const initalState = null
  
  const [state, setState] = useState({
    email: "",
    password: "",
  });
//   const [formErrors, setFormErrors] = useState({ 
//     error: "" ,
//     email: "",
//     password: "",
//   })
  
  const location = useLocation()
  const navigate = useNavigate()

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };
//   const handleInputOnBlur = (e) => {
//     setFormErrors({
//         ...formErrors,
//         [e.target.name]: validateForm(formData)[e.target.name],
//     });
//   }
  const {login, loginWithGoogle} = useAuth()
  const handleSubmit = async () => {
      try{
        await login(state.email, state.password)
        return navigate('/starting')
      }
      catch(error){
        console.log(error.message)
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
        return navigate('/starting')
    }
  },[user])

 

  console.log("------------------------")
  // if (user){
  //   return navigation.navigate("LoadingScreen",{destiny:"MyProfiles"})
  // }
    return (
        <div className="container"> 
            <h1 className="title">Hola!</h1>
            <h2 className="sub-title">Logea con tu cuenta</h2>
            <input 
                className="text-input" 
                type='text'
                name='email'
                value={state.email}  
                placeholder="Ingresa un email" 
                onChange={(value) => handleChangeText(value, "email")}
                // onBlur={handleInputOnBlur}
            />
            <input 
                className="text-input" 
                type='text'
                name='password'
                value={state.password}  
                secureTextEntry={true}
                placeholder="Ingresa una contraseña" 
                onChange={(value) => handleChangeText(value, "password")}
                // onBlur={handleInputOnBlur}
            />
            <ButtonLogin onPress={handleSubmit}/>
            <ButtonLoginGoogle onPress={handleGoogleLogin}/>

            <button onClick={()=>navigate('/register')}className="text">No tengo cuenta!</button>
        </div>
    )
}

export default Login;