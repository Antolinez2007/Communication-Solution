/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db, track } from '../firebase'
const C=createContext(null)
export function AuthProvider({children}) { const [user,setUser]=useState(null); const [profile,setProfile]=useState(null); const [loading,setLoading]=useState(true)
 useEffect(()=>onAuthStateChanged(auth,async u=>{setUser(u); if(u){const snap=await getDoc(doc(db,'users',u.uid)); setProfile(snap.exists()?{id:snap.id,...snap.data()}:null)}else setProfile(null); setLoading(false)}),[])
 async function login(email,password){await signInWithEmailAndPassword(auth,email,password); track('login',{method:'password'})}
 async function register(data){const c=await createUserWithEmailAndPassword(auth,data.email,data.password); await updateProfile(c.user,{displayName:data.name}); const p={name:data.name,email:data.email,role:'employee',department:data.department,title:data.title||'Colaborador',createdAt:serverTimestamp(),active:true}; await setDoc(doc(db,'users',c.user.uid),p); setProfile({id:c.user.uid,...p}); track('sign_up',{method:'password'})}
 const value=useMemo(()=>({user,profile,loading,login,register,logout:()=>signOut(auth),reset:(email)=>sendPasswordResetEmail(auth,email)}),[user,profile,loading]); return <C.Provider value={value}>{children}</C.Provider> }
export const useAuth=()=>useContext(C)
