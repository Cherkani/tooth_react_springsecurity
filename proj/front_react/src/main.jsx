import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AdminHome from './components/admin/AdminHome';
import ProfHome from './components/prof/ProfHome';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Preline from "./components/Preline";
import NotFound404 from './components/auth/NotFound404'

const userlogin = JSON.parse(localStorage.getItem("userlogin"))
const email = JSON.parse(localStorage.getItem("email"))
const code = JSON.parse(localStorage.getItem("code"))
let role
if (userlogin !== null){
  role = userlogin.role
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Preline />
      <Routes>
        {userlogin ? (
          <>
            {role === 'admin' && <Route path='/admin' element={<AdminHome />} />}
            {role === 'professor' && <Route path='/professor/:componentName' element={<ProfHome />} />}
            {role === 'professor' && <Route path='/professor' element={<Navigate replace to={`/${role}/profil`} />} />}
            {!(role === 'admin') && <Route path='/admin' element={<Navigate replace to={`/${role}`} />} />}
            {!(role === 'professor') && <Route path='/professor' element={<Navigate replace to={`/${role}`} />} />}
            <Route path='/login' element={<Navigate replace to={`/${role}`} />} />
            <Route path='/login/*' element={<Navigate replace to={`/${role}`} />} />
            <Route path='/register' element={<Navigate replace to={`/${role}`} />} />
            <Route path='/' element={<Navigate replace to={`/${role}`} />} />
            
          </>
        ) : (
          <>
            <Route path='/admin' element={<Navigate replace to="/login" />} />
            <Route path='/professor/:componentName' element={<Navigate replace to="/login" />} />
            <Route path='/student' element={<Navigate replace to="/login" />} />
          </>
        )}

        {!userlogin && <Route path="/login" element={<Login />} />}
        {!userlogin && <Route path="/register" element={<Register />} />}
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
