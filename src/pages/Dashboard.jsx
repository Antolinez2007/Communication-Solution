import { useState } from 'react'
import { BarChart3, Bell, BookOpen, FileText, Home, Lightbulb, LogOut, Menu, UserRound, Vote } from 'lucide-react'
import Brand from '../components/Brand'
import { ROLES } from '../config'
import { useAuth } from '../context/AuthContext'
import HomeView from './views/HomeView'
import ContributionsView from './views/ContributionsView'
import IdeasView from './views/IdeasView'
import SurveysView from './views/SurveysView'
import TrainingView from './views/TrainingView'
import ReportsView from './views/ReportsView'
import ProfileView from './views/ProfileView'
const tabs=[['home','Inicio',Home],['contributions','Aportes',FileText],['ideas','Ideas',Lightbulb],['surveys','Encuestas',Vote],['training','Capacitación',BookOpen],['reports','Reportes',BarChart3],['profile','Perfil',UserRound]]
export default function Dashboard(){const {profile,logout}=useAuth();const [tab,setTab]=useState('home');const [open,setOpen]=useState(false);const leaders=['ceo','manager','supervisor'];const visible=tabs.filter(t=>t[0]!=='reports'||leaders.includes(profile.role));const views={home:<HomeView go={setTab}/>,contributions:<ContributionsView/>,ideas:<IdeasView/>,surveys:<SurveysView/>,training:<TrainingView/>,reports:<ReportsView/>,profile:<ProfileView/>}
 return <div className="app-shell"><aside className={open?'sidebar open':'sidebar'}><Brand/><nav>{visible.map(([id,label,Icon])=><button key={id} className={tab===id?'active':''} onClick={()=>{setTab(id);setOpen(false)}}><Icon/>{label}</button>)}</nav><button className="logout" onClick={logout}><LogOut/>Cerrar sesión</button></aside><main className="main"><header className="topbar"><button className="menu" onClick={()=>setOpen(!open)}><Menu/></button><div><span className="muted">{ROLES[profile.role]||profile.role}</span><strong>{profile.name}</strong></div><button className="icon-btn" aria-label="Notificaciones"><Bell/></button></header>{views[tab]}</main></div>}
