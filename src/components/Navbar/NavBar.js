
import {useNavigate} from 'react-router-dom';
import './NavBar.css'
export default function NavBar (){
    const navigate = useNavigate()
    const patch = window.location.href
    const selected = (navigatePatch='')=>{
        if (patch === 'http://localhost:3000/'+ navigatePatch){
            return true
        }else{return}
    }
    console.log(patch)
    if (patch==='http://localhost:3000/'||patch==='http://localhost:3000/login'||patch==='http://localhost:3000/register'||patch==='http://localhost:3000/starting'){
        return(
            <div className='container-navBar-login'>
                <button className='button-navBar' onClick={()=>navigate('/login')}>Login</button>
                <button className='button-navBar' onClick={()=>navigate('/register')}>Registrarse</button>
            </div>
        )}else if(patch==='http://localhost:3000/myProfiles'){
            return(
                <div className='container-navBar'></div>
            )
        }else {
            return(
                <div className='container-navBar'>
                    <button className={selected('products')?'button-navBar-selected':'button-navBar'} onClick={()=>navigate('/products')}>Productos</button>
                    <button className={selected('charge')?'button-navBar-selected':'button-navBar'} onClick={()=>navigate('/charge')}>Cobrar</button>
                    <button className={selected('sells')?'button-navBar-selected':'button-navBar'} onClick={()=>navigate('/sells')}>Ventas</button>
                    <button className={selected('customers')?'button-navBar-selected':'button-navBar'} onClick={()=>navigate('/customers')}>Clientes</button>
                    <button className={selected('providers')?'button-navBar-selected':'button-navBar'} onClick={()=>navigate('/providers')}>Provedores</button>
                    <button className={selected('account')?'button-navBar-selected':'button-navBar'} onClick={()=>navigate('/account')}>Cuenta</button>
                </div>
            )
        }
}