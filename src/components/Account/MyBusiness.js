import './MyBusiness.css'
import {useEffect,useState} from 'react'
import {useAuth} from '../../Context/authContext'
import {getFirestore, doc, getDoc} from 'firebase/firestore';
import {postFirestoreId} from '../../Firebase/ApiFunctions'
import Icon from '@mdi/react';
import { useNavigate } from 'react-router';
import { mdiStorefront } from '@mdi/js';
import { mdiContentSave } from '@mdi/js';
import { mdiArrowLeft} from '@mdi/js';
import {alertConfirmacion} from '../Reusables/Alerts'
const inconColor =("rgb(52, 51, 72)")


const MyBusiness=()=>{
    console.log("------------------------")
    console.log("Cuenta")
    const {user} = useAuth()
    const navigate= useNavigate()
    ////////////////////////////////////////////////////
    const [apiDoc,setApiDoc] = useState(null)
   
    const [editable,setEditable] = useState({
        negocio:"",
        de:"",
        cbu:"",
        ubicacion:"",
        cuit:"",
        telefono:"",
    })
    ////////////////////////////////////////////////////
    const getMyBusinessApi = ()=>{
      const selectedDoc = doc(getFirestore(), "users/"+user.uid)
      getDoc(selectedDoc).then(res => setApiDoc(res.data()))
    }
    const postMyBusiness = ()=>{
      const selectedDoc = doc(getFirestore(), "users/"+user.uid)
      postFirestoreId(selectedDoc,{...apiDoc,myBusiness:{...editable}})
    }  
    useEffect(()=>{
        getMyBusinessApi()
    },[])
    useEffect(()=>{
      if (apiDoc?.myBusiness){
        setEditable({
          ...editable,
          ...apiDoc.myBusiness
        })
      }  
  },[apiDoc])
    ////////////////////////////////////////////////////

    const save = ()=>{
      postMyBusiness()
      navigate("/account")
      return true
    }
    const handleChangeInput = (e)=>{
        setEditable({
          ...editable,
          [e.target.name]:e.target.value
        })
      }
    console.log("------------------------")
    return(
      <div className='container-MenuProductos'>
        <div className='imgBackGroundCustom'></div>
          <div className='container-nav-MenuProductos'>
              <div className='button-Container-MenuProductos'>
                  <button className='button-MenuProductos' onClick={() => navigate(-1)}>    
                      <Icon path={mdiArrowLeft} size={2} color={inconColor} />   
                  </button>
              </div>
              {(apiDoc?.myBusiness!==editable)&&
               <div className='button-Container-MenuProductos'>
               <button className='button-MenuProductos' onClick={()=>alertConfirmacion("Actualizar Informacion?",null,save,"Complete los campos")}>    
                   <Icon path={mdiContentSave} size={2} color='#1a6b91' />   
                   <p className='text-button-MenuProductos'>Actualizar Informacion</p> 
               </button></div>}
        </div>
        <div className='container-mybusiness'>
            
                <button  className='button-MenuProductos'>    
                    <Icon path={mdiStorefront} size={4} color={inconColor} />   
                </button>
                <div  className='cotainerIcon-agregarUno'>
                    <p className='text-agregarUno'>Negocio:</p>
                    <input className='input-agregarUno' name="negocio" onChange={(e)=>handleChangeInput(e)} value={editable.negocio}/>
                </div>
                <div className='cotainerIcon-agregarUno'>
                    <p className='text-agregarUno'>De:</p>
                    <input className='input-agregarUno' name="de" onChange={(e)=>handleChangeInput(e)} value={editable.de}/>
                </div>
                
                <div className='cotainerIcon-agregarUno'>
                    <p className='text-agregarUno'>Cuit:</p>
                    <input className='input-agregarUno' name="cuit" onChange={(e)=>handleChangeInput(e)} value={editable.cuit}/>
                </div>
                <div className='cotainerIcon-agregarUno'>
                    <p className='text-agregarUno'>Cbu:</p>
                    <input className='input-agregarUno' name="cbu" onChange={(e)=>handleChangeInput(e)} value={editable.cbu}/>
                </div>
                <div className='cotainerIcon-agregarUno'>
                    <p className='text-agregarUno'>Ubicacion:</p>
                    <input className='input-agregarUno' name="ubicacion" onChange={(e)=>handleChangeInput(e)} value={editable.ubicacion}/>
                </div>
                <div className='cotainerIcon-agregarUno'>
                    <p className='text-agregarUno'>Telefono:</p>
                    <input className='input-agregarUno' name="telefono" onChange={(e)=>handleChangeInput(e)} value={editable.telefono}/>
                </div>    
        </div>        
        </div>
    );
}
export default MyBusiness