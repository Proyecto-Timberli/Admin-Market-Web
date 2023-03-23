import './LinkProfile.css'
import {useState, useEffect} from 'react'
import {getFirestore, collection, getDocs, doc, getDoc, } from 'firebase/firestore';
import {postFirestore} from '../../Firebase/ApiFunctions'
import {useAuth} from '../../Context/authContext'
import Loading from '../Reusables/Loading'
import Icon from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';
import ConfigProfile from './ConfigProflie'

const LinkProfile=()=>{
    console.log("------------------------")
    console.log("LinkProfileToUser")
    const {user} = useAuth()
    const[profileSettings,setProfileSettings]= useState(null)
    const [userCode, setUserCode] = useState(null)
    const [valideCode,setValideCode]= useState(null)
    const [configProfile,setConfigProfile]=useState(false)
    useEffect(()=>{
        if (userCode){getUserExist(userCode)}
    },[userCode])
    ////////////////////////////////////////////////////////////////////
    const [profileSelected,setProfileSelected]=useState(null)
    ////////////////////////////////////////////////////////////////////


    const getProfilesSettingsApi = ()=>{
        const selectedCollection = collection(getFirestore(), "users/"+user.uid+"/profilesForUsers")
        getDocs(selectedCollection).then(res => setProfileSettings(res.docs.map(profileSetting=>({id:profileSetting.id,...profileSetting.data()}))))
    }
    const getUserExist = async (uid)=>{
        //controla si el codigo de usuario existe
        const selectedDoc= doc(getFirestore(), "users/"+uid)
        await getDoc(selectedDoc)
        .then(res=>{setValideCode(res._document?res._document:"null")})
        .catch(err => {setValideCode("null")})
    }
    useEffect(()=>{
        getProfilesSettingsApi()  
    },[configProfile])
    let dataRender = profileSettings;
    ////////////////////////////////////////////////////////////////////
    const postLinkProfile = (data,uid)=>{
        const selectedCollection = collection(getFirestore(), "users/"+uid+"/myProfiles")
        postFirestore(selectedCollection,data)
        const selectedCollection2 = collection(getFirestore(), "users/"+user.uid+"/linkedProfiles")
        const selectedDoc= doc(getFirestore(), "users/"+uid)
        getDoc(selectedDoc).then(res=>postFirestore(selectedCollection2,{...data,uidLinked:uid,identifierLinked:(res.data().identifier) }))
    }   
    console.log("------------------------")
    ////////////////////////////////////////////////////////////////////
    // postLinkProfile(profileSelected,code)
    return( 
        <>{configProfile?<ConfigProfile active={setConfigProfile}/>:
        <div className='container-LinkProfile'>
            <h3 className='title-LinkProfile'>Vincular Usuario</h3>
            <button 
                className='button-LinkProfile'
                onClick={()=>setConfigProfile(true)}
                >   
                <p className='textBold-LinkProfile'>Configurar Un Perfil</p>
                <Icon path={mdiChevronRight} size={1} color={"black"}/>    
            </button>
            <div className='containerList-LinkProfile'>
                <p className='text1-LinkProfile'>Selecciona un perfil para vincularlo</p>
            {!profileSettings?<Loading/>:
            dataRender.map(item=>
                <>
                    <button 
                        className={profileSelected==item?'profileButtonColor-LinkProfile':'profileButton-LinkProfile'}
                        onClick={() => setProfileSelected(item)}
                    >
                       {profileSelected==item?
                            <p className='textWhite-LinkProfile'>{item.name}</p>:
                            <p className='text-LinkProfile'>{item.name}</p>}
                    </button>
                </>
            )}
            </div>
            <input 
                className='input-LinkProfile'
                onChange={(e)=>setUserCode(e.value)}
                value={userCode}
                placeholder='Ingrese codigo de usuario...'
            />
            <p className='text1-LinkProfile'>Usuario: {userCode?userCode:'*seleccione usuario'}</p>
            {valideCode=="null"&&<p>*El usuario no existe</p>}
            <p className='text1-LinkProfile'>Perfil: {profileSelected?profileSelected.name:'*seleccione perfil'}</p>
                {(profileSelected&&(valideCode&&valideCode!="null"))?
                <button
                className='buttonColor-LinkProfile'
                    onClick={()=>postLinkProfile(profileSelected,userCode)}>
                    <p className='textWhite-LinkProfile'>Vincular</p>
                </button>:
                <button
                    className='buttonNoColor-LinkProfile'>
                    <p className='textWhite-LinkProfile'>Vincular</p>
                </button>}               
        </div>   }
        </> 
    ) 
}
export default LinkProfile
