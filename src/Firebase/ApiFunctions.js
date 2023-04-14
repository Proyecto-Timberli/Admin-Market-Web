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
export function formatDate (date){
    date=date.split(" ")
    const formatDate=(date[1]+" "+date[2]+" "+date[3])
    const hora=(date[4])
    const dia=(date[2])
    const mes=(date[1])
    const año=(date[3])
    return {formatDate: formatDate, hora:hora, mes:mes, año:año,dia:dia}
}
export  function formatMes (mes){
    let response=null
    if (mes==='jan'){
      response='01'
    }
    else if (mes==='Feb'){
      response='02'
    }
    else if (mes==='Mar'){
      response='03'
    }
    else if (mes==='Apr'){
      response='04'
    }
    else if (mes==='May'){
      response='05'
    }
    else if (mes==='Jun'){
      response='06'
    }
    else if (mes==='Jul'){
      response='07'
    }
    else if (mes==='Aug'){
      response='08'
    }
    else if (mes==='Sep'){
      response='09'
    }
    else if (mes==='Oct'){
      response='10'
    }
    else if (mes==='Nov'){
      response='11'
    }
    else if (mes==='Dec'){
      response='12'
    }
    return response
}