import './MyAccount.css'

import {useAuth} from '../../Context/authContext'
import Icon from '@mdi/react';
import { mdiAccountBox } from '@mdi/js';
import { mdiContentCopy } from '@mdi/js';
import QRCode  from  "react-qr-code" ;
const inconColor =("rgb(52, 51, 72)")



const MyAcount=()=>{
    console.log("------------------------")
    console.log("MyAcount")
    const {user} = useAuth()
  
    console.log("------------------------")
    return(
        <div className='container-myaccount'>
            <div className='container2-myaccount'>
                <button  className='button-MenuProductos'>    
                    <Icon path={mdiAccountBox} size={4} color={inconColor} />   
                    <p className='text-account'>{user.email}</p>
                </button>
            </div>
            <div className='conatiner3-myaccount'>               
                    <p className='text-account'>Codigo de Usuario: {user.uid}</p>                  
                    <button  className='button-MenuProductos'>    
                        <Icon path={mdiContentCopy} size={1} color="black" />   
                        <p className='textCopiar-account'>copiar</p>
                    </button>                                               
            </div>
            <div className='qrContainer-MyAccount'>< QRCode 
                size = { 256 } 
                style = { {  height : "auto" ,  maxWidth : "100%" ,  width : "100%"  } }
                value = {user.uid} 
                viewBox = { `0 0 256 256` } 
            /></div>
        </div>
    );
}
export default MyAcount