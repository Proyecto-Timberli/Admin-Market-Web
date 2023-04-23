import { useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
}from 'chart.js';
//LineElement, BarElement,
import {Line} from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);


const options = {
  animated:true,
  fill:true,
  responsive:true,
  scales:{
    y:{
      min:0,
      // max:500,
    }
  },
  plugins:{
    legend:{
      display:true
    }
  }
}
export default function GraficoLine({scores, scores2, labels, labelName1, backgroundColor}) {
  const data = 
    {
      datasets:[
        {
          label:labelName1,
          data: scores,
          tension: 0.1,
          borderColor:'aqua',
          pointRadius:3,
          pointBackgroundColor: 'black',
          backgroundColor: backgroundColor,
          
        },
        // {
        //   label:labelName2,
        //   data: scores2,
        //   tension: 0.1,
        //   borderColor:'aqua',
        //   pointRadius:3,
        //   pointBackgroundColor: 'black',
        //   backgroundColor: 'rgba(0,255,0,0.3)',
        // },
      ],
      labels,
    };
  

  return (
      <Line data={data} options={options}/>
  );
}

