import './CardSell.css'
const CardVenta = ({id,total,fecha,resumen})=>{
    return (
        <> 
          <div
          className='lista-CardVenta'>
                    <p className='texto1-CardVenta'>{id}</p>
                    <p className='texto2-CardVenta'>{total}</p>
                    <p className='texto3-CardVenta'>{fecha} </p>
          </div>
        </>
    );
};
export default CardVenta
