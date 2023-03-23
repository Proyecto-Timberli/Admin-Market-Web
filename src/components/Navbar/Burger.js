import './Burger.css'

export default function Burger({clicked, handleClicked}){
    return(
            <div className={!clicked?"hamburger":"hamburger is-active"} id="hamburger-4" onClick={()=>handleClicked()}>
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
    )
}