import './ConfigProfile.css'
import {useState,useEffect} from 'react'
import {getFirestore, collection} from 'firebase/firestore';
import {postFirestore} from '../../Firebase/ApiFunctions'
import {useAuth} from '../../Context/authContext'
import Icon from '@mdi/react';
import { mdiCheckboxMarked } from '@mdi/js';
import { mdiCloseBox } from '@mdi/js';
import { mdiContentSaveCheck } from '@mdi/js';
import { mdiArrowLeft } from '@mdi/js';
import {alertConfirmacion} from '../Reusables/Alerts'
import { useNavigate } from 'react-router';
////////////////////////////////////////////////////
const ConfigProfile = ()=>{
    const {user} = useAuth()
    const navigate = useNavigate()
    const [permissions, setPermissions] = useState({
        name:"",
        modifyProducts: false,
        modifyClients:false,
        modifyProviders:false,
        modifySales:false,
        modifyBuys:false,
        accessToStatistics:false,
        accessToBuys:false,
        accesToProviders:false,
        uidEntry:user.uid,
        from:user.email
    })
    const postProfileForUsers = (data)=>{
        const selectedCollection = collection(getFirestore(), "users/"+user.uid+"/profilesForUsers")
        postFirestore(selectedCollection,data)
    }
    const checkOk=(key)=>{
        setPermissions({
           ...permissions,
           [key]:true
        })
    }
    const checkNull=(key)=>{
        setPermissions({
            ...permissions,
            [key]:false
         })
    }
    const handleChangeInput =(e)=>{
        setPermissions({
            ...permissions,
            name:e.target.value
        })
    }
    const completedProfile = ()=>{
        if(permissions.name){
            postProfileForUsers(permissions)
            navigate(-1)
            return true
        }else{return false}
    }
    console.log("------------------------")
    return (
        <div className='container-MenuProductos'>
            <div className = 'container-nav-MenuProductos'>              
            <div className='button-Container-MenuProductos'>
                <button  className='button-ConfigPofile' onClick={() => navigate(-1)}>
                    <Icon path={mdiArrowLeft} size={2} color='rgb(52, 51, 72)'/>
                </button>
            </div>
            <div className='button-Container-MenuProductos'>
                <button  className='button-ConfigPofile'onClick={()=>alertConfirmacion("Crear Perfil?",null,completedProfile,"Complete los campos")}>
                    <Icon path={mdiContentSaveCheck} size={2} color='#1a6b91'/>
                    <p className='text-button-MenuProductos'>Crear Profile</p> 
                </button>
            </div>
        </div>
        <div className='container-ConfigProfile'>
            <div className='containerInput-ConfigProfile'>
                <p className='textBold-ConfigProfile'>Perfil:</p>
                <input
                    className='input-ConfigProfile'
                    onChange={(e)=>handleChangeInput(e)}
                    value={permissions.name}
                    placeholder='Nombre del perfil...'
                />
            </div>
    
            <div className='containerOption-ConfigProfile'>
                <p className='text1-ConfigProfile'>Modificar Productos</p>
                {permissions.modifyProducts?
                <div className='containerChecks-ConfigProfile'>
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkOk("modifyProducts")}><Icon path={mdiCheckboxMarked} size={1.5} color="green"/></button> 
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkNull("modifyProducts")}><Icon path={mdiCloseBox} size={1.5} color="gray" /></button> 
                </div>:
                 <div className='containerChecks-ConfigProfile'>
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkOk("modifyProducts")}><Icon path={mdiCheckboxMarked} size={1.5} color="gray"/></button> 
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkNull("modifyProducts")}><Icon path={mdiCloseBox} size={1.5} color="red" /></button> 
                </div>
                }
            </div>
            <div className='containerOption-ConfigProfile'>
                <p className='text1-ConfigProfile'>Modificar Clientes</p>
                {permissions.modifyClients?
                <div className='containerChecks-ConfigProfile'>
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkOk("modifyClients")}><Icon path={mdiCheckboxMarked} size={1.5} color="green"/></button> 
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkNull("modifyClients")}><Icon path={mdiCloseBox} size={1.5} color="gray" /></button> 
                </div>:
                 <div className='containerChecks-ConfigProfile'>
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkOk("modifyClients")}><Icon path={mdiCheckboxMarked} size={1.5} color="gray"/></button> 
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkNull("modifyClients")}><Icon path={mdiCloseBox} size={1.5} color="red" /></button> 
                </div>
                }
             </div>
            <div className='containerOption-ConfigProfile'>
                <p className='text1-ConfigProfile'>Modificar Provedores</p>
                {permissions.modifyProviders?
                <div className='containerChecks-ConfigProfile'>
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkOk("modifyProviders")}><Icon path={mdiCheckboxMarked} size={1.5} color="green"/></button> 
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkNull("modifyProviders")}><Icon path={mdiCloseBox} size={1.5} color="gray" /></button> 
                </div>:
                 <div className='containerChecks-ConfigProfile'>
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkOk("modifyProviders")}><Icon path={mdiCheckboxMarked} size={1.5} color="gray"/></button> 
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkNull("modifyProviders")}><Icon path={mdiCloseBox} size={1.5} color="red" /></button> 
                </div>
                }
            </div>
            <div className='containerOption-ConfigProfile'>
                <p className='text1-ConfigProfile'>Modificar Ventas</p>
                {permissions.modifySales?
                <div className='containerChecks-ConfigProfile'>
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkOk("modifySales")}><Icon path={mdiCheckboxMarked} size={1.5} color="green"/></button> 
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkNull("modifySales")}><Icon path={mdiCloseBox} size={1.5} color="gray" /></button> 
                </div>:
                 <div className='containerChecks-ConfigProfile'>
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkOk("modifySales")}><Icon path={mdiCheckboxMarked} size={1.5} color="gray"/></button> 
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkNull("modifySales")}><Icon path={mdiCloseBox} size={1.5} color="red" /></button> 
                </div>
                }
            </div>
            <div className='containerOption-ConfigProfile'>
                <p className='text1-ConfigProfile'>Modificar Compras</p>
                {permissions.modifyBuys?
                <div className='containerChecks-ConfigProfile'>
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkOk("modifyBuys")}><Icon path={mdiCheckboxMarked} size={1.5} color="green"/></button> 
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkNull("modifyBuys")}><Icon path={mdiCloseBox} size={1.5} color="gray" /></button> 
                </div>:
                 <div className='containerChecks-ConfigProfile'>
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkOk("modifyBuys")}><Icon path={mdiCheckboxMarked} size={1.5} color="gray"/></button> 
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkNull("modifyBuys")}><Icon path={mdiCloseBox} size={1.5} color="red" /></button> 
                </div>
                }
            </div>
            <div className='containerOption-ConfigProfile'>
                <p className='text1-ConfigProfile'>Acceso a las estadisticas</p>
                {permissions.accessToStatistics?
                <div className='containerChecks-ConfigProfile'>
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkOk("accessToStatistics")}><Icon path={mdiCheckboxMarked} size={1.5} color="green"/></button> 
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkNull("accessToStatistics")}><Icon path={mdiCloseBox} size={1.5} color="gray" /></button> 
                </div>:
                 <div className='containerChecks-ConfigProfile'>
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkOk("accessToStatistics")}><Icon path={mdiCheckboxMarked} size={1.5} color="gray"/></button> 
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkNull("accessToStatistics")}><Icon path={mdiCloseBox} size={1.5} color="red" /></button> 
                </div>
                }
            </div>
            <div className='containerOption-ConfigProfile'>
                <p className='text1-ConfigProfile'>Acceso a las compras</p>
                {permissions.accessToBuys?
                <div className='containerChecks-ConfigProfile'>
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkOk("accessToBuys")}><Icon path={mdiCheckboxMarked} size={1.5} color="green"/></button> 
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkNull("accessToBuys")}><Icon path={mdiCloseBox} size={1.5} color="gray" /></button> 
                </div>:
                 <div className='containerChecks-ConfigProfile'>
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkOk("accessToBuys")}><Icon path={mdiCheckboxMarked} size={1.5} color="gray"/></button> 
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkNull("accessToBuys")}><Icon path={mdiCloseBox} size={1.5} color="red" /></button> 
                </div>
                }
            </div>
            <div className='containerOption-ConfigProfile'>
                <p className='text1-ConfigProfile'>Acceso a los provedores</p>
                {permissions.accesToProviders?
                <div className='containerChecks-ConfigProfile'>
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkOk("accesToProviders")}><Icon path={mdiCheckboxMarked} size={1.5} color="green"/></button> 
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkNull("accesToProviders")}><Icon path={mdiCloseBox} size={1.5} color="gray" /></button> 
                </div>:
                 <div className='containerChecks-ConfigProfile'>
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkOk("accesToProviders")}><Icon path={mdiCheckboxMarked} size={1.5} color="gray"/></button> 
                    <button className='buttonIcon-ConfigProfile' onClick={()=>checkNull("accesToProviders")}><Icon path={mdiCloseBox} size={1.5} color="red" /></button> 
                </div>
                }
            </div>
        </div> 
        </div>
        
    )
}
export default ConfigProfile;