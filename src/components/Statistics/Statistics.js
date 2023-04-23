import './Statistics.css'
import GraficoLine from "./GraficoLine";
import { useState, useEffect} from 'react';
import {getFirestore, collection, getDocs,Timestamp} from 'firebase/firestore';
import {formatDate,formatMes } from '../../Firebase/ApiFunctions'
import {useAuth} from '../../Context/authContext'
import { mdiVideoInputScart } from '@mdi/js';
import SelectComponent from '../Reusables/Select'
function getStatistics (userProfile,setStateSales,setStateBuys){
  //ventas
  const selectedC = collection(getFirestore(), "users/"+userProfile+"/sales")
  getDocs(selectedC)
  .then(res => setStateSales(res.docs.map(sale=>({id:sale.id,...sale.data()})))).catch(console.log('error getStatistics sales'))
  //compras
  const selectedC2 = collection(getFirestore(), "users/"+userProfile+"/buys")
  getDocs(selectedC2)
  .then(res => setStateBuys(res.docs.map(buy=>({id:buy.id,...buy.data()})))).catch(console.log('error getStatistics buys'))

}
function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

export default function Statistics() {
  const {userProfile} = useAuth()
  const [salesApi,setSalesApi]=useState(null)
  const [buysApi,setBuysApi]=useState(null)
  const moco = 1000000
  const [mesState,setMesState]=useState(null)
  const [renderDates,setRenderDates]=useState({
    scores : [6,6,7,5,4,3,6,10],
    labels : ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
  })
  const [renderDates2,setRenderDates2]=useState({
    scores : [6,6,7,5,4,3,6,10],
    labels : ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
  })
  const sumaArray= function(array){
    let total=0
    array.forEach(e=>{total=total+e})
    return total
  }
  function dataTransform(time,state,setRenderDates,renderDates){
    ///////////////////////////////////////////
    // dataTransform captura recive un string 'mes' ej: 'Apr' , luego filtra las ventas de ese mes 
    // las agrupa en dias y envia los dias y los valores a rendereDates
    // IMPORTANTE: Tener en cuenta que filtra por mes y no por año cuando el año cambie va a ver conflictos MODIFICAR
    ///////////////////////////////////////////
    time= !time? formatDate(Timestamp.now().toDate().toString()).mes:time//obtenemos el dia de hoy formateado con nuestra funcion

    let salesMes= state?.length? state.filter(sale=>sale.createdDate.includes(time)):null//obtenemos el mes y filtramos las ventas

    let orderByDay={} //incializamos objeto para agrupar las ventas segun sus dias
    
    ///////////////////////////////////////////
    salesMes?.forEach(e=>{
      // agrupamos las ventas segun sus dias
      let dia=formatDate(e.createdDate).dia
      if(orderByDay[dia]){
        let save= orderByDay[dia]
        orderByDay[dia]= [...save,e]
      }
      else{orderByDay[dia]=[e]}})

    console.log(orderByDay)
    //////////////////////////////////////////
    let diasMes = Object.keys(orderByDay).sort() // dias del mes donde hubo actividad
    let sumaTotalDias = []
    diasMes.forEach(e=>{
      let suma=0
      orderByDay[e].forEach(i=>{
        suma= suma+i.total
      })
      sumaTotalDias.push(suma)
    })

    console.log(diasMes)
    console.log(sumaTotalDias)
    setRenderDates({
      ...renderDates, 
      scores: sumaTotalDias,
      labels: diasMes

    })
  }

  useEffect(()=>{
    if (userProfile){getStatistics(userProfile,setSalesApi,setBuysApi)}
    let mesActual= formatDate(Timestamp.now().toDate().toString()).mes
    setMesState({id:mesActual,name:'Mes actual'})
  },[userProfile])
  useEffect(()=>{
    dataTransform(mesState?.id,salesApi,setRenderDates,renderDates)
    dataTransform(mesState?.id,buysApi,setRenderDates2,renderDates2)
  },[salesApi,buysApi,mesState])

  return (
    <div className='container-Statistics'>
      <div className='imgBackGroundCustom'></div>
      <div className='gralContainer-Statistics'>
        <SelectComponent
          text={'Selecciona un mes'}
          text2={mesState?.name}
          arraySelects={[
            {id:'Jan',name:'Enero'},
            {id:'Feb',name:'Febrero'},
            {id:'Mar',name:'Marzo'},
            {id:'Apr',name:'Abril'},
            {id:'May',name:'Mayo'},
            {id:'Jun',name:'Junio'},
            {id:'Jul',name:'Julio'},
            {id:'Aug',name:'Agosto'},
            {id:'Sep',name:'Septiembre'},
            {id:'Oct',name:'Octubre'},
            {id:'Nov',name:'Noviembre'},
            {id:'Dec',name:'Diciembre'},
          ]}
          selectFunction={setMesState}
        />
        <div className="statsContainer-Statistics">
          <p className='statsVentas'>Ventas: {financial(sumaArray(renderDates.scores))}</p>
          <p className='statsCompras'>Compras: {financial(sumaArray(renderDates2.scores))}</p>
          {/* <div><p>Otros gastos: {moco}</p></div> */}
          <p className='statsNeto'>Ingreso neto: {financial(sumaArray(renderDates.scores))-financial(sumaArray(renderDates2.scores))}</p>
        </div>
       <div className="graficoContainer-Statistics">
          {renderDates&&<GraficoLine scores={renderDates.scores}  labels={renderDates.labels} labelName1={'Ventas'} backgroundColor={'rgba(0,255,0,0.3)'}/>}
        </div> 
        <div className="graficoContainer-Statistics">
          {renderDates2&&<GraficoLine scores={renderDates2.scores}  labels={renderDates2.labels} labelName1={'Compras'} backgroundColor={'bisque'}/>}
        </div> 
      </div>
     
    </div>
  );
}



// que quuiero ver en estadisticas
// compras
// ventas
// balance
// productos mas vendidos cantidad
// porductos que mas ganacia dieron
// diario/semanal/mensual/ultimos 2-11 meses/anual
// como lo voy a hacer:
//   voy a hacer un pedido a las ventas, un pedido a las compras
//   voy a clasificar por fecha
  

// movimientos diarios