
import {useState, useEffect, } from 'react'
import {getFirestore, collection, getDocs, doc} from 'firebase/firestore';
import {postFirestoreId} from '../../Firebase/ApiFunctions'
import {useAuth} from '../../Context/authContext'
import Loading from '../Reusables/Loading'
// import { LinearGradient } from 'expo-linear-gradient';
// import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import Icon from '@mdi/react';
import { mdiCheckboxMarked } from '@mdi/js';
import { mdiCloseBox } from '@mdi/js';
import { mdiPlusBox } from '@mdi/js';
import {useNavigate } from 'react-router-dom';
import './Modal.css'
import './MyProfiles.css'
function Modal({stateModal,getProfilesApi}){
    
    const {user} = useAuth()
    const [name, setName]=useState(null)
    const postMyBusinessProfile = (name)=>{
        const selectedCollection = doc(getFirestore(), "users/"+user.uid+"/myProfiles/"+user.uid)
        postFirestoreId(selectedCollection,{name:name,uidEntry:user.uid})     
    }   
        
    function modalHandler(e){
      setName(e.target.value)
    }
    function checkOk(){
      postMyBusinessProfile(name)
      stateModal(false)
      getProfilesApi()
    // navigation.navigate("LoadingScreen",{destiny:"MyProfiles"})
    }
    function exit(){
      stateModal(false)
    }
    return (
        <div  className='modalContainer'>
            <div className='modal' >
                <input
                    className='textInput-modal'
                    onChange={(e) => modalHandler(e)}
                    value={name?.toString()}
                />
                <div className='modalButtonsContainers'>
                    <button className='button-modal' onClick={()=>checkOk()}><Icon path={mdiCheckboxMarked} size={2} color="green" /></button> 
                    <button className='button-modal' onClick={()=>exit()}><Icon path={mdiCloseBox} size={2} color="red" /></button> 
                </div> 
            </div>
        </div>
    )
  }
const MyProfiles=()=>{
    console.log("------------------------")
    console.log("MyProfiles")
    
    const {user,changedProfile} = useAuth()
    const [modal,setModal]= useState(false)
    const navigate = useNavigate()  
    const [myProfilesApi,setMyProfilesApi]= useState(null)
    const getProfilesApi = ()=>{
      const selectedCollection= collection(getFirestore(), "users/"+user.uid+"/myProfiles")
        getDocs(selectedCollection).then(res => setMyProfilesApi(res.docs.map(profile=>({id:profile.id,...profile.data()}))))
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        })
    }

    // const unsubscribe = navigation.addListener('beforeRemove', e => {
    //   if(navigation.getState().index==2){
    //     BackHandler.exitApp()
    //     e.preventDefault();
    //   }
    //   // unsubscribe anula la navegacion volver
    // });
    useEffect(() => {
    //   unsubscribe()
      getProfilesApi()
    },[])

    const [hasProfile,setHasProfile]= useState([1])
    //limitando los perfiles a crear
    useEffect(() => {
        setHasProfile(myProfilesApi? myProfilesApi.filter((e) => e.id && e.id.includes(user.uid)):[1])
    },[myProfilesApi])
    let dataRender = myProfilesApi
    ////////////////////////////////////////////////////////////////////
  
    ////////////////////////////////////////////////////////////////////
        
   
    return( 
        <div className='container'>
            {modal&&<Modal stateModal={setModal}  getProfilesApi={getProfilesApi}/>}
            <h1 className='title-myProfiles' >Perfiles de Negocio</h1>
            <div className='container-myProfiles'>{hasProfile.length?null:
                <button  onClick={() => setModal(true)} className='cardProfile'>
                    <Icon path={mdiPlusBox} size={2} color="black"/>
                        <p>Crea tu Perfil de Negocio</p>
                </button>}
                {!myProfilesApi?<Loading/>:
                <>{dataRender.map(item=>
                    <button
                        onClick={() => {
                            changedProfile(item.uidEntry,item)
                            navigate("/menuPrincipal")
                        }}
                        className='cardProfile'>
                            <p className='text-myProfiles'>{item.name}</p>
                            {item.from&&<p className='text-myProfiles' >de: {item.from}</p>}   
                    </button>)}</>}
            </div>
        </div>
    )
}

export default MyProfiles
