import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics'
const config = { apiKey:import.meta.env.VITE_FIREBASE_API_KEY, authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID, storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, appId:import.meta.env.VITE_FIREBASE_APP_ID, measurementId:import.meta.env.VITE_FIREBASE_MEASUREMENT_ID }
export const isConfigured = Boolean(config.apiKey && config.projectId)
const app = initializeApp(config)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
let analyticsPromise = isConfigured && typeof window !== 'undefined' ? isSupported().then(ok => ok ? getAnalytics(app) : null).catch(()=>null) : Promise.resolve(null)
export async function track(name, params={}) { const analytics=await analyticsPromise; if(analytics) logEvent(analytics,name,params) }
