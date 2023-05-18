import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Shared/Layout/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './Components/Pages/Login/Login';
import SignUpForm from './Components/Pages/SignUp/SignUp';
import AllUsers from './Modules/Users/AllUser/AllConsumer';
import NotPageFound from './Components/Pages/Home/Home';
import HomePage from './Components/Pages/About/About';
import Footer from './Components/Shared/Layout/Footer';
import AddUser from './Modules/Users/AddUser/AddConsumer';
import UserEdit from './Modules/Users/UserEdit';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
         {/* <Navbar isLoggedIn={false} onLogout={function (): void {
          throw new Error('Function not implemented.');
        } }></Navbar> */}
        <Routes>
        <Route path="/" element={<LoginForm/>}></Route>
          <Route path="/user" element={<AllUsers />}></Route> 
          <Route path="/signup" element={<SignUpForm />}></Route>
          <Route path="/login" element={<HomePage/>}></Route>
          <Route path="*" element={<NotPageFound></NotPageFound>}></Route>
        </Routes>
        {/* <Footer></Footer> */}
      </BrowserRouter>
    </div>
  );
} 

export default App;
