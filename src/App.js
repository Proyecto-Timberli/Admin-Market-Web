
import './App.css';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import {AuthProvider, } from './Context/authContext'
import NavBar from './components/Navbar/NavBar'
import ErrorPage from './components/Error/ErrorPage'
import Products from './components/Products/Products'
import Account from './components/Account/Account'
import Customers from './components/Customers/Customers'
import Providers from './components/Providers/Providers'
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login'
import Register from './components/Login/Register'
import Starting from './components/Login/Starting'
import MyProfiles from './components/Login/MyProfiles';
import Statistics from './components/Statistics/Statistics'

// Customers
import AddClient from './components/Customers/AddClient'
import ClientInfoEdit from './components/Customers/ClientInfoEdit'

import AddProvider from './components/Providers/AddProvider';
import ProviderInfoEdit from './components/Providers/ProviderInfoEdit'

// charge
import Charge from './components/Charge/Charge'
import Sells from './components/Charge/Sells';
import SellResumen from './components/Charge/VentaResumen'
//buys
import Buys from './components/Buys/Buys'
import NewBuy from './components/Buys/newBuy'
import BuyResumen from './components/Buys/BuyResmune'
// porducts
import NewCategory from './components/Products/Nueva-Categoria'
import AddOne from './components/Products/Agregar-uno'
import EditInfo from './components/Products/EditInfo'
// account
import LinkProfile from './components/Account/LinkProfile';
import MyBusiness from './components/Account/MyBusiness';
import ConfigProfile from './components/Account/ConfigProflie'
// home
import Home from './components/Home/Home'

//
import ProtectedRoutes from './components/Error/ProtectedRoute';

function App() {
  return (
    <BrowserRouter> 
    <AuthProvider>
    <NavBar/>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      
      <Route element={<ProtectedRoutes/>}>
        <Route path="/starting" element={<Starting/>}/>
        <Route path="/myProfiles" element={<MyProfiles/>}/>
        {/* VISTA COBRAR */}
        <Route path="/charge" element={<Charge/>}/>
        <Route path="/sells" element={<Sells/>}/>
        <Route path="/sellresumen" element={<SellResumen/>}/>

        {/* VISTA HOME */}
        <Route path="/menuPrincipal" element={<Home/>}/>

        {/* VISTA CLIENTES */}
        <Route path="/customers" element={<Customers/>}/>
        <Route path="/customers/addclient" element={<AddClient/>}/>
        <Route path="/customers/clientinfoedit" element={<ClientInfoEdit/>}/>      

        {/* VISTA PROVEDORES */}
        <Route path="/products" element={<Products/>} />
        <Route path="/providers" element={<Providers/>}/>
        <Route path="/providers/addprovider" element={<AddProvider/>}/>
        <Route path="/providers/providerinfoedit" element={<ProviderInfoEdit/>}/>

        {/* VISTA ESTADISTICAS */}
        <Route path="/statistics" element={<Statistics/>}/>

        {/* VISTA COMPRAS */}
        <Route path="/buys" element={<Buys/>}/>
        <Route path="/newbuy" element={<NewBuy/>}/>
        <Route path="/buyresumen" element={<BuyResumen/>}/>

        {/* VISTA PRODUCTOS */}
        <Route path="/products/addproduct" element={<AddOne/>}/>
        <Route path="/products/newCategory" element={<NewCategory/>}/>
        <Route path="/products/editInfo" element={<EditInfo/>}/>

        {/* VISTA CUENTA */}
        <Route path="/account" element={<Account/>}/>
        <Route path="/account/myProfiles" element={<MyProfiles/>}/>
        <Route path="/account/myBusiness" element={<MyBusiness/>}/>
        <Route path="/account/linkProfile" element={<LinkProfile/>}/>
        <Route path="/account/linkProfile/configProfile" element={<ConfigProfile/>}/>
      </Route>
      <Route path="*" element={<ErrorPage/>}/>
    </Routes>
    </AuthProvider>
    </BrowserRouter> 
  )
}

export default App;
