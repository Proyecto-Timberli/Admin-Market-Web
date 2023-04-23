import './LinkProfile.css'
import {useState, useEffect} from 'react'
import {getFirestore, collection, getDocs, doc, getDoc, } from 'firebase/firestore';
import {postFirestore} from '../../Firebase/ApiFunctions'
import {useAuth} from '../../Context/authContext'
import Loading from '../Reusables/Loading'
import Icon from '@mdi/react';
import { mdiPlusBox} from '@mdi/js';
import { mdiArrowLeft } from '@mdi/js';
import ConfigProfile from './ConfigProflie'
import {alertConfirmacion} from '../Reusables/Alerts'
import {  useNavigate } from 'react-router';
const inconColor =("rgb(52, 51, 72)")

const LinkProfile=()=>{
    const {user} = useAuth()
    const navigate = useNavigate()
    const[profileSettings,setProfileSettings]= useState(null)
    const [userCode, setUserCode] = useState(null)
    const [valideCode,setValideCode]= useState(null)
    const [configProfile,setConfigProfile]=useState(false)
    useEffect(()=>{
        console.log(valideCode)
        if (userCode){getUserExist(userCode)
        }
    },[userCode])
    const handleSetCode=(e)=>{
        setUserCode(e.target.value)
    }
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
        setProfileSelected(null)
        setUserCode("")
        setValideCode(null)
    }   
    console.log("------------------------")
    ////////////////////////////////////////////////////////////////////
    // postLinkProfile(profileSelected,code)
    return( 
        <div className='container-MenuProductos'>
        <div className='imgBackGroundCustom'></div>
          <div className='container-nav-MenuProductos'>
              <div className='button-Container-MenuProductos'>
                  <button className='button-MenuProductos' onClick={() => navigate(-1)}>    
                      <Icon path={mdiArrowLeft} size={2} color={inconColor} />   
                  </button>                  
              </div>
              <div className='button-Container-MenuProductos'>
                  <button className='button-MenuProductos' onClick={()=>navigate('configProfile')}>    
                      <Icon path={mdiPlusBox} size={2} color={inconColor} />   
                      <p className='text-button-MenuProductos'>Agregar un Perfil</p> 
                  </button>                  
              </div>
        </div>
        <>{configProfile?<ConfigProfile active={setConfigProfile}/>:
        <div className='container-LinkProfile'>
            <h3 className='title-LinkProfile'>Vincular Usuario</h3>
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
                onChange={(e)=>handleSetCode(e)}
                value={userCode}
                placeholder='Ingrese codigo de usuario...'
            />
            <p className='text1-LinkProfile'>Usuario: {userCode?userCode:'*Ingrese codigo de usuario'}</p>
            {valideCode=="null"&&<p>*El usuario no existe</p>}
            <p className='text1-LinkProfile'>Perfil: {profileSelected?profileSelected.name:'*seleccione perfil'}</p>
                {(profileSelected&&(valideCode&&valideCode!="null"))?
                <button
                className='buttonColor-LinkProfile'
                    onClick={()=>alertConfirmacion('Vincular perfil seleccionado al usuario?',null,()=>postLinkProfile(profileSelected,userCode))}>
                    <p className='textWhite-LinkProfile'>Vincular</p>
                </button>:
                <button
                    className='buttonNoColor-LinkProfile'>
                    <p className='textWhite-LinkProfile'>Vincular</p>
                </button>}               
        </div>   }
        </> 
        </div>
    ) 
}
export default LinkProfile
