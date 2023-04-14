
import './App.css';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import {AuthProvider, } from './Context/authContext'
import NavBar from './components/Navbar/NavBar'
// import ErrorPage from './components/Error/ErrorPage'
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
function App() {
  return (
    <BrowserRouter> 
    <NavBar/>
    <AuthProvider>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/starting" element={<Starting/>}/>
      <Route path="/myProfiles" element={<MyProfiles/>}/>
      <Route path="/products" element={<Products/>} />
      <Route path="/customers" element={<Customers/>}/>
      <Route path="/providers" element={<Providers/>}/>
      <Route path="/charge" element={<Charge/>}/>
      <Route path="/account" element={<Account/>}/>
      <Route path="/sells" element={<Sells/>}/>

      <Route path="/sellresumen" element={<SellResumen/>}/>


      <Route path="/customers/addclient" element={<AddClient/>}/>
      <Route path="/customers/clientinfoedit" element={<ClientInfoEdit/>}/>
      {/* <Route path="/error" element={<ErrorPage/>}/> */}
      <Route path="/providers/addprovider" element={<AddProvider/>}/>
      <Route path="/providers/providerinfoedit" element={<ProviderInfoEdit/>}/>

      <Route path="/statistics" element={<Statistics/>}/>

      <Route path="/buys" element={<Buys/>}/>
      <Route path="/newbuy" element={<NewBuy/>}/>

    </Routes>
    </AuthProvider>
    </BrowserRouter> 
  )
}

export default App;
