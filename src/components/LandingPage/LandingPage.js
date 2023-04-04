import './LandingPage.css'
import imagen1 from './AndroidAPK.png'
import imagen2 from './crome2.png'
import imagen3 from './phone&pc.png'
export default function LandingPage (){
    return(
        <div className='container-LandingPage'>
            <div className='ipsu-LandingPage'>
                <h1 className='title-LandingPage'>Somos la mejor forma de administar tu negocio.</h1>
                <p className='subTitle-LandingPage'>Podes utilizar nuestros servicios desde la web o podes descargar la App en tu telefono.</p>
                <div className='buttonscontainer-LandingPage'>
                    <div className='button-LandingPage'><img src={imagen2} width={70} height={40}/><p className='textbutton-LandingPage'>Ingresa desde la web</p></div>
                    <div className='button-LandingPage'><img src={imagen1} width={40} height={40} className='imagen1-LandingPage'/><p className='textbutton-LandingPage'>App para android</p></div>
                </div>
            </div>
            <div className='imagen-LandingPage'>
                <img src={imagen3}  className='img-LandingPage'/>
            </div>
        </div>
    )
}