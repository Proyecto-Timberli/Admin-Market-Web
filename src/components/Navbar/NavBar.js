import {useAuth} from '../../Context/authContext'
import {useNavigate} from 'react-router-dom';
import './NavBar.css'
import Burger from './Burger'
import { useState } from 'react';
import ImagenLogo from '../../assets/LogoOnly.png'
import Icon from '@mdi/react';
import { mdiLogout } from '@mdi/js';
import {alertConfirmacion} from '../Reusables/Alerts'
const { REACT_APP_PATCH } = process.env
export default function NavBar (){
    const {logout,user,userPermissions} = useAuth()
    const navigate = useNavigate()
    const handleLogout = async ()=>{
        if(user){
            await logout()
            navigate("/login")
        }
    }
    const patch = window.location.href
    const [clicked,setClicked] =useState(false)
    const handleClicked =()=>{
        setClicked(!clicked)
    }


        if(user&&(patch===REACT_APP_PATCH||patch===REACT_APP_PATCH+'login'||patch===REACT_APP_PATCH+'register'||patch===REACT_APP_PATCH+'starting')){
            return(
                <div className={clicked?'container-navBar active-navBar':'container-navBar-login'}>
                      <div className='logo-navBar' onClick={()=>navigate(user?'/menuPrincipal':'/')}>
                            <img className='imgLogo-navBar' src={ImagenLogo}/>
                            <div className='textContainerLogo-navBar'>
                                <p className='textLogo-navBar'>Business Admin</p>
                                <p className='textLogo2-navBar'>TIMBERLI</p>
                            </div>
                        </div>
                    <div className='burger-navBar'><Burger clicked={clicked} handleClicked={handleClicked}/></div>
                    <button  className={clicked?'buttonLogout-NavBar':'buttonOculto-navBar'} onClick={()=>alertConfirmacion("Cerrar sección?",null,handleLogout)}>    
                        <Icon path={mdiLogout} size={1.3} color={'#1a6b91'} />   
                    </button>  
                </div>)
        }else if (patch===REACT_APP_PATCH||patch===REACT_APP_PATCH+'login'||patch===REACT_APP_PATCH+'register'||patch===REACT_APP_PATCH+'starting'){
            return(
                <div className={clicked?'container-navBar active-navBar':'container-navBar-login'}>
                      <div className='logo-navBar' onClick={()=>navigate(user?'/menuPrincipal':'/')}>
                            <img className='imgLogo-navBar' src={ImagenLogo}/>
                            <div className='textContainerLogo-navBar'>
                                <p className='textLogo-navBar'>Business Admin</p>
                                <p className='textLogo2-navBar'>TIMBERLI</p>
                            </div>
                        </div>
                    <div className='burger-navBar'><Burger clicked={clicked} handleClicked={handleClicked}/></div>
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'} onClick={()=>navigate('/login')}><p className='textButton-Navbar'>Inicia sesión</p></button>
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'} onClick={()=>navigate('/register')}><p className='textButton-Navbar'>Registrate</p></button>
                </div>)
        }else if(patch===REACT_APP_PATCH+'myProfiles'){
            return(
                <div className={clicked?'container-navBar active-navBar':'container-navBar-login'}>
                <div className='logo-navBar' >
                      <img className='imgLogo-navBar' src={ImagenLogo}/>
                      <div className='textContainerLogo-navBar'>
                          <p className='textLogo-navBar'>Business Admin</p>
                          <p className='textLogo2-navBar'>TIMBERLI</p>
                      </div>
                  </div>
          </div>)
        }else if (!user){
            return(
                <div className={clicked?'container-navBar active-navBar':'container-navBar-login'}>
                      <div className='logo-navBar' onClick={()=>navigate(user?'/menuPrincipal':'/')}>
                            <img className='imgLogo-navBar' src={ImagenLogo}/>
                            <div className='textContainerLogo-navBar'>
                                <p className='textLogo-navBar'>Business Admin</p>
                                <p className='textLogo2-navBar'>TIMBERLI</p>
                            </div>
                        </div>
                    <div className='burger-navBar'><Burger clicked={clicked} handleClicked={handleClicked}/></div>
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'} onClick={()=>navigate('/login')}><p className='textButton-Navbar'>Inicia sesión</p></button>
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'} onClick={()=>navigate('/register')}><p className='textButton-Navbar'>Registrate</p></button>
                </div>)
        }else {
            return(
                <div className={clicked?'container-navBar active-navBar':'container-navBar'}>
                   <div className='logo-navBar' onClick={()=>navigate(user?'/menuPrincipal':'/')}>
                        <img className='imgLogo-navBar' src={ImagenLogo}/>
                        <div className='textContainerLogo-navBar'>
                            <p className='textLogo-navBar'>Business Admin</p>
                            <p className='textLogo2-navBar'>TIMBERLI</p>
                        </div>
                    </div>
                    <div className='burger-navBar'><Burger clicked={clicked} handleClicked={handleClicked}/></div>
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'} onClick={()=>navigate('/charge')}><p className='textButton-Navbar'>Cobrar</p></button>
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'}  onClick={()=>navigate('/sells')}><p className='textButton-Navbar'>Ventas</p></button>
                    {userPermissions?.accessToBuys&&<button className={clicked?'button-navBar':'buttonOculto-navBar'}  onClick={()=>navigate('/buys')}><p className='textButton-Navbar'>Compras</p></button>}
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'} onClick={()=>navigate('/products')}><p className='textButton-Navbar'>Productos</p></button>
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'}  onClick={()=>navigate('/customers')}><p className='textButton-Navbar'>Clientes</p></button>
                    {userPermissions?.accesToProviders&&<button className={clicked?'button-navBar':'buttonOculto-navBar'}  onClick={()=>navigate('/providers')}><p className='textButton-Navbar'>Provedores</p></button>}
                    {userPermissions?.accessToStatistics&&<button className={clicked?'button-navBar':'buttonOculto-navBar'}  onClick={()=>navigate('/statistics')}><p className='textButton-Navbar'>Estadisticas</p></button>}
                    <button className={clicked?'button-navBar':'buttonOculto-navBar'}  onClick={()=>navigate('/account')}><p className='textButton-Navbar'>Cuenta</p></button>
                    <button  className={clicked?'buttonLogout-NavBar':'buttonOculto-navBar'} onClick={()=>alertConfirmacion("Cerrar sección?",null,handleLogout)}>    
                        <Icon path={mdiLogout} size={1.3} color={'#1a6b91'} />   
                    </button>  
                </div>
            )
        }
}