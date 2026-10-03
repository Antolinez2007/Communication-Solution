import { MessageCircleMore } from 'lucide-react'
import { APP } from '../config'
export default function Brand({compact=false}){return <div className="brand"><span className="brand-icon"><MessageCircleMore/></span>{!compact&&<span><strong>{APP.shortName},</strong><small>Nuestra Mejora</small></span>}</div>}
