import {Link } from "react-router-dom";
export default function NavBar (){
    
    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to={`products`}>Productos</Link>
                    </li>
                    <li>
                        <Link to={`charge`}>Cobrar</Link>
                    </li>
                    <li>
                        <Link to={`sells`}>Ventas</Link>
                    </li>
                    <li>
                        <Link to={`customers`}>Clientes</Link>
                    </li>
                    <li>
                        <Link to={`providers`}>Provedores</Link>
                    </li>
                    <li>
                        <Link to={`account`}>Mi Cuenta</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}