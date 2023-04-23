import {useEffect,useState} from 'react'
import { useNavigate } from 'react-router'
import {useAuth} from '../../Context/authContext'
import Icon from '@mdi/react';
import { mdiAccountBox } from '@mdi/js';
import { mdiStorefront } from '@mdi/js';
import { mdiAccountConvert } from '@mdi/js';
import { mdiLogout } from '@mdi/js';
import { mdiLinkVariantPlus } from '@mdi/js';
//screens
import MyAccount from './MyAccount'
import MyProfiles from '../Login/MyProfiles';
import MyBusiness from './MyBusiness'
import LinkProfile from './LinkProfile'

const inconColor =("rgb(52, 51, 72)")

const Cuenta=()=>{
    console.log("------------------------")
    console.log("Cuenta")
    const {user, logout} = useAuth()
    const navigate = useNavigate()
    const handleLogout = async ()=>{
        await logout()
        navigate("/login")
    }
    /////////Protected Screen
    useEffect(() => {
        if (!user){
            return navigate("/login")
        }
    },[])
    /////////Protected Screen
    const [screen, setScreen] = useState('myaccount')
    console.log("------------------------")

    return(
        <div className='container-account'>
            <div className='imgBackGroundCustom'></div>
            <div className='container-nav-MenuProductos'>
            
                <div className='button-Container-MenuProductos'>
                    <button  className='button-MenuProductos' onClick={()=>navigate("myBusiness")}>    
                        <Icon path={mdiStorefront} size={2} color={inconColor} />   
                        <p className='text-button-MenuProductos'>Mi Negocio</p>
                    </button>   
                </div>
                <div className='button-Container-MenuProductos'>
                    <button  className='button-MenuProductos' onClick={()=>navigate("myProfiles")}>    
                        <Icon path={mdiAccountConvert} size={2} color={inconColor} />   
                        <p className='text-button-MenuProductos'>Mis Perfiles</p>
                    </button>  
                </div>
                <div className='button-Container-MenuProductos'>
                    <button  className='button-MenuProductos' onClick={()=>navigate("linkProfile")}>    
                        <Icon path={mdiLinkVariantPlus} size={2} color={inconColor} />   
                        <p className='text-button-MenuProductos'>Vincular Usuario</p>
                    </button>
                </div>
                {/* <div className='button-Container-MenuProductos'>
                    <button  className='button-MenuProductos' onClick={()=>handleLogout()}>    
                        <Icon path={mdiLogout} size={2} color={inconColor} />   
                        <p className='text-button-MenuProductos'>Logout</p>
                    </button>  
                </div> */}
            </div>  
            <div className='container-screen-MenuProducts'>
               <MyAccount/>
            </div>
        </div>
    );
}
export default Cuenta