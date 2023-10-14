import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Caminhao } from "./pages/Caminhao";
import { Oficina } from "./pages/Oficina";

export const isAuthenticated = () => {
    const token = sessionStorage.getItem('token');
    return token !== null;
};

export function PrivateRoute({ children }) {
    if(!isAuthenticated()){
        return <Navigate to='/' replace />
    }
    return children;
};

export function Navigations() {

    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path='/dashboard' element={<Dashboard />}/>
                    <Route path='/caminhao' element={<Caminhao />}/>
                    <Route path='/oficina' element={<Oficina />}/>
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    )
};
