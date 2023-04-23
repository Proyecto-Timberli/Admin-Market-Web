import swal from "sweetalert";


function alertCustom2(text){
    
    swal({
        title:text,
        text:text,
        icon:"success",
        // icon:"info",
        // icon:"error",
        // icon:"warning",
        // buttons: "Aceptar",
        buttons:["No","Si"],
        // timer:"2000",
    })
}
export  function alertConfirmacion(pregunta,text,functionAlert,textError){
    
    swal({
        title:pregunta,
        text:text,
        icon:"warning",
        buttons:["No","Si"],
    })
    .then(res=>{
        if(res){
            console.log('.......................')
            console.log(res)
            if(functionAlert){
                if(functionAlert()){
                    swal({
                        icon:"success",
                        timer:"2000",
                    })
    
                }else{
                    swal({
                        text:textError?textError:'Accion Invalida',
                        icon:'error',
                        timer:"2000",
                    })
                }
            }
            
           
        }
    })
}