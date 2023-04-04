
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
            <div className={clicked?'container-navBar active-navBar':'container-navBar-login'}>
                <div className='burger-navBar'><Burger clicked={clicked} handleClicked={handleClicked}/></div>
                <button className={clicked?'button-navBar':'buttonOculto-navBar'} onClick={()=>navigate('/login')}><p className='textButton-Navbar'>Login</p></button>
                <button className={clicked?'button-navBar':'buttonOculto-navBar'} onClick={()=>navigate('/register')}><p className='textButton-Navbar'>Registrarse</p></button>
            </div>
        )}else if(patch==='http://localhost:3000/myProfiles'){
            return(
                <div className='container-navBar'></div>
            )
        }else {
            return(
                <div className={clicked?'container-navBar active-navBar':'container-navBar'}>
                    <div className='burger-navBar'><Burger clicked={clicked} handleClicked={handleClicked}/></div>
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'} onClick={()=>navigate('/products')}><p className='textButton-Navbar'>Productos</p></button>
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'} onClick={()=>navigate('/charge')}><p className='textButton-Navbar'>Cobrar</p></button>
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'}  onClick={()=>navigate('/sells')}><p className='textButton-Navbar'>Ventas</p></button>
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'}  onClick={()=>navigate('/customers')}><p className='textButton-Navbar'>Clientes</p></button>
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'}  onClick={()=>navigate('/providers')}><p className='textButton-Navbar'>Provedores</p></button>
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'}  onClick={()=>navigate('/account')}><p className='textButton-Navbar'>Cuenta</p></button>
                </div>
            )
        }
}