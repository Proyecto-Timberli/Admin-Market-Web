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
export  function alertConfirmacion(pregunta,text,functionAlert){
    
    swal({
        title:pregunta,
        text:text,
        icon:"warning",
        buttons:["No","Si"],
    })
    .then(res=>{
        if(res){
            functionAlert&&functionAlert()
            swal({
                icon:"success",
                timer:"2000",
            })
        }
    })
}