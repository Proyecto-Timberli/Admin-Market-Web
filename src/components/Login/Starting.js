import React, { useEffect,useState} from "react";
import {postFirestoreId} from '../../Firebase/ApiFunctions'
import {useAuth} from '../../Context/authContext'
import {getFirestore,doc, getDoc} from 'firebase/firestore';
import Loading from '../Reusables/Loading'
import {useNavigate } from 'react-router-dom';


const Starting =  ()=> {
    const navigate = useNavigate()  
    console.log("------------------------")
    console.log("Starting")
    const {user} = useAuth()
    const [state,setState]=useState(null)
    const postUser =()=>{
        const docRef =doc(getFirestore(),"users/"+user.uid)
        getDoc(docRef).then(res => res.data()?setState(res.data()):setState("identifierNONE")).catch(err => console.log(err))
        
    }
    useEffect(() => {
        console.log("Inicializando Cuenta")
        if (user?.uid){ 
            console.log(user.uid)
            postUser()  }
        console.log("---user.uid----")
        console.log(user)
    },[user])
    useEffect(() => {
        if (state){                                
            if(state=="identifierNONE"){
                const docRef =doc(getFirestore(),"users/"+user.uid)
                postFirestoreId(docRef,{identifier:user.email})
                navigate("/myProfiles")
            
            }else{
                console.log(state.identifier)
                navigate("/myProfiles")
            } 
        }
    },[state])
    console.log("------------------------")
    return (
        <div className="container-login"> 
            <Loading/>
        </div>
    )
}


export default Starting