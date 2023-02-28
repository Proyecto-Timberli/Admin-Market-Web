import {getFirestore, collection, getDocs, doc, getDoc, setDoc, deleteDoc, addDoc} from 'firebase/firestore';
export const putFirestore = (selectedDoc, data)=>{
    setDoc(selectedDoc, data)
    .then(res => {
        console.log("se modifico el documento");
        return("se modifico el documento")
    })
    .catch(error => {
        console.log(error.message);
        return(error.message)
    })
}
export const deleteFirestore =(selectedDoc)=>{
    deleteDoc(selectedDoc)
    .then(res => {
        console.log("se elimino el documento");
        return("se elimino el documento");
    })
    .catch(error => {
        console.log(error.message);
        return(error.message)
    })
}
export const postFirestore = (selectedCollection,data)=>{
    addDoc(selectedCollection, data)
    .then(res => {
        console.log("se agrego el documento");
        return("se agrego el documento");
    })
    .catch(error => {
        console.log(error.message);
        return(error.message)
    })
}
export const postFirestoreId = (docRef,data)=>{
    setDoc(docRef, data)
    .then(res => {
        console.log("se agrego el documento");
        return("se agrego el documento");
    })
    .catch(error => {
        console.log(error.message);
        return(error.message)
    })
}


export const postFirestorePlus = (selectedCollection,array)=>{
    array.forEach(element => {
        addDoc(selectedCollection, element)
        .then(res => {
            console.log("se agrego el documento");
            return("se agrego el documento");
        })
        .catch(error => {
            console.log(error.message);
            return(error.message)
        })
    });
    
}