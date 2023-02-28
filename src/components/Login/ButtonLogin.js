import './ButtonLogin.css';

export function ButtonLogin({onPress}){
   
    return (    
        <button
            className='login-button'
            onClick={() => onPress()}>Login</button> 
    )
}
export function ButtonLoginGoogle({onPress}){
  return (    
    <button
        className='login-button'
        onClick={() => onPress()}>
            {/* <img src="../../assets/googleIcon.png" width="45" height="45"/> */}
            Login with Google</button> 
)
}
export function ButtonRegister({onPress}){
   
    return (    
        <button
        className='login-button'
        onClick={() => onPress()}>Registrar Cuenta</button> 
    )
}

