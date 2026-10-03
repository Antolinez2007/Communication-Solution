import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import { isConfigured } from './firebase'
function Guard(){const {user,profile,loading}=useAuth();if(loading)return <div className="splash">Cargando…</div>;if(!user)return <Navigate to="/acceso" replace/>;if(!profile)return <div className="splash">Tu cuenta existe, pero falta el perfil de Firestore. Cierra sesión y regístrate nuevamente.</div>;return <Dashboard/>}
export default function App(){if(!isConfigured)return <div className="setup"><h1>Configura Firebase</h1><p>Copia <code>.env.example</code> como <code>.env</code> y agrega las variables de tu aplicación web.</p></div>;return <Routes><Route path="/acceso" element={<AuthPage/>}/><Route path="/*" element={<Guard/>}/></Routes>}
