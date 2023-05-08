import './Login.css'
import React, { useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom';
import {ButtonLogin} from './ButtonLogin'
import {ButtonLoginGoogle} from './ButtonLogin'
import {useAuth} from '../../Context/authContext'
// import validateForm from '../register/validation.js';

export function validate(input) {
  const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
  let errors = {};
  if (!input.email) {
    errors.email = '*ingresa un email'
  }
  if (!input.password){
    errors.summary = '*ingresa una contraseña'
  }
  
  return errors;
};
function Login(){
  console.log("------------------------")
  console.log("Login")
 
  //////////////////////////////////////////////////////////////
  const {login, loginWithGoogle, user} = useAuth()
  //////////////////////////////////////////////////////////////
  
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState(false)
  
  const navigate = useNavigate()
  
  const handleChangeText = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
        setFormErrors(true)
        if(Object.keys(validate(state)).length){
          console.log(validate(state))
        }else{
          let loginRes = null
          loginRes =  await login(state.email, state.password)
          if(Object.keys(loginRes)[0]==='error'){
            setFormErrors(loginRes)
          }else if(Object.keys(loginRes)[0]==='successful'){
            navigate('/starting')
          }
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
      <div className='container1-login'>
        <div className="container-login"> 
            <h1 className="title-login">Hola!</h1>
            <h2 className="sub-title-login">Logea con tu cuenta</h2>
            <input 
                className="text-input-login" 
                type='email'
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
            {Object.keys(formErrors)[0]==='error'&&<div className='redError-container'><p className='redError'>{formErrors.error}</p></div>}
            <ButtonLogin onPress={handleSubmit}/>
            <ButtonLoginGoogle onPress={handleGoogleLogin}/>

            <button onClick={()=>navigate('/register')}className="text-login">No tengo cuenta!</button>
        </div>
    </div>
    )
}

export default Login;