
import {useNavigate} from 'react-router-dom';
import './NavBar.css'
import Burger from './Burger'
import { useState } from 'react';
export default function NavBar (){
    const navigate = useNavigate()
    const patch = window.location.href
    const [clicked,setClicked] =useState(false)
    const handleClicked =()=>{
        setClicked(!clicked)
    }
    const selected = (navigatePatch='')=>{
        if (patch === 'http://localhost:3000/'+ navigatePatch){
            return true
        }else{return}
    }
    if (patch==='http://localhost:3000/'||patch==='http://localhost:3000/login'||patch==='http://localhost:3000/register'||patch==='http://localhost:3000/starting'){
        return(
            <div className='container-navBar-login'>
                <button className='button-navBar' onClick={()=>navigate('/login')}>Login</button>
                <button className='button-navBar' onClick={()=>navigate('/register')}>Registrarse</button>
            </div>
        )}else if(patch==='http://localhost:3000/myProfiles'){
            return(
                <div className='container-navBar'></div>
            )
        }else {
            return(
                <div className={clicked?'container-navBar active-navBar':'container-navBar'}>
                    <div className='burger-navBar'><Burger clicked={clicked} handleClicked={handleClicked}/></div>
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'} onClick={()=>navigate('/products')}>Productos</button>
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'} onClick={()=>navigate('/charge')}>Cobrar</button>
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'}  onClick={()=>navigate('/sells')}>Ventas</button>
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'}  onClick={()=>navigate('/customers')}>Clientes</button>
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'}  onClick={()=>navigate('/providers')}>Provedores</button>
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'}  onClick={()=>navigate('/account')}>Cuenta</button>
                </div>
            )
        }
}