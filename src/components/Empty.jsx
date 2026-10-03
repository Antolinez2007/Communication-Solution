import { Inbox } from 'lucide-react'
export default function Empty({text='Todavía no hay información.'}){return <div className="empty"><Inbox/><p>{text}</p></div>}
