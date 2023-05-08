import {createContext , useContext, useEffect, useState} from 'react';
import {signInWithPopup ,GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from '../Firebase/firebase'

export const authContext = createContext();
export function useAuth (){
    const context = useContext(authContext)
    return context
} 

 
export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [userProfile, setUserProfile] = useState(null)
    const [userPermissions,setUserPermissions]=useState(null)
    const [loading, setLoading] = useState(true)
    const signup = (email , password ) => 
        createUserWithEmailAndPassword(auth, email, password)
        .then(function(res) {return ({successful:res})})
        .catch(function(res) {return ({error:res.message})});
    const login = async (email, password ) =>
        signInWithEmailAndPassword(auth, email, password)
        .then(function(res) {return ({successful:res})})
        .catch(function(res) {return ({error:res.message})});
    const logout = () => signOut(auth)
    const loginWithGoogle =  () => {
        const googleProvider =  new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }
    const changedProfile = (uid,profile)=>{
        console.log("------------------------")
        console.log("AuthProvider")
        console.log("changedProfile")
        console.log("------------------------")
        setUserPermissions(profile)
        setUserProfile(uid)
    }
    useEffect(() => {
        onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            console.log("------------------------")
            console.log("AuthProvider")
            console.log("Combrobando si hay usuario logeado")
            console.log("currentUser.uid:")
            console.log(currentUser?.uid)
            console.log("AuthProvider")
            setUserProfile(currentUser?.uid)
            setLoading(false)
        })
    },[])
    return (
        <authContext.Provider value={{signup, login, user, logout, loading, loginWithGoogle,changedProfile,userProfile,userPermissions}}>
             {children}
        </authContext.Provider>
    )
}