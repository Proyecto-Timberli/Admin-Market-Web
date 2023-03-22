import './ConfigProfile.css'
import {useState,useEffect} from 'react'
import {getFirestore, collection} from 'firebase/firestore';
import {postFirestore} from '../../Firebase/ApiFunctions'
import {useAuth} from '../../Context/authContext'
import Icon from '@mdi/react';
import { mdiCheckboxMarked } from '@mdi/js';
import { mdiCloseBox } from '@mdi/js';
import { mdiContentSaveCheck } from '@mdi/js';
////////////////////////////////////////////////////
const ConfigProfile = ({active})=>{
    console.log("------------------------")
    console.log("ConfigProfile")
    const {user} = useAuth()
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
            alert("Perfil Agregado")
            active(false)
        }else{alert("Complete los campos")}
    }
    console.log("------------------------")
    return (
        <>
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
                <p>Modificar Productos</p>
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
                <p>Modificar Clientes</p>
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
                <p>Modificar Provedores</p>
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
                <p>Modificar Ventas</p>
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
                <p>Modificar Compras</p>
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
                <p>Acceso a las estadisticas</p>
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
                <p>Acceso a las compras</p>
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
                <p>Acceso a los provedores</p>
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
            <button
                className='buttonColor-ConfigProfile'
                onClick={()=>completedProfile()}
                iconSelect={"content-save-check"}
            >
                <Icon path={mdiContentSaveCheck} size={2} color="white" />
                <p className='textWhite-ConfigProfile'>Crear Profile</p>
            </button>
            
        
        </div> 
        </>
    )
}
export default ConfigProfile;