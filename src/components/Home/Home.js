import './Home.css'
import {useAuth} from '../../Context/authContext'
import {getFirestore, doc, getDoc} from 'firebase/firestore';
import {useEffect,useState} from 'react'


export default function Home(){
    const {userProfile,userPermissions} = useAuth() 
    const [apiDoc,setApiDoc] = useState(null)
    const getMyBusinessApi = ()=>{
        const selectedDoc = doc(getFirestore(), "users/"+userProfile)
        getDoc(selectedDoc).then(res => setApiDoc(res.data().myBusiness))
    }
    useEffect(()=>{
        getMyBusinessApi() 
    },[])


    return(
        <div className="container-MenuProductos">
            <div className='imgBackGroundCustom'></div>
        <div className="container-home">
            <h1 onClick={()=>console.log(userPermissions)}>Bienvenido!</h1>
            <p>Empresa: {apiDoc?.negocio} </p>
            <p>Perfil de usuario: {userPermissions?.name} </p>
        </div>
        </div>
    )
}