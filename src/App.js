
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import {AuthProvider, } from './Context/authContext'
import NavBar from './components/Navbar/NavBar'
// import ErrorPage from './components/Error/ErrorPage'
import Products from './components/Products/Products'
import Account from './components/Account/Account'
import Charge from './components/Charge/Charge'
import Customers from './components/Customers/Customers'
import Providers from './components/Providers/Provider'
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login'
import Sells from './components/Sells/Sells'

function App() {

  return (
    <BrowserRouter> 
    <AuthProvider>
      <NavBar/>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/products" element={<Products/>} />
      <Route path="/account" element={<Charge/>}/>
      <Route path="/customers" element={<Customers/>}/>
      <Route path="/providers" element={<Providers/>}/>
      <Route path="/charge" element={<Charge/>}/>
      <Route path="/account" element={<Account/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/sells" element={<Sells/>}/>
      {/* <Route path="/error" element={<ErrorPage/>}/> */}
    </Routes>
    </AuthProvider>
    </BrowserRouter> 
  )
}

export default App;
