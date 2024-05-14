import React, { createContext, useEffect, useState } from 'react'
import { app } from '../../config/firebase.init';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
export const AuthContext = createContext()
function AuthProvider({children}) {
    
    const [user,setUser] = useState(null)
    const [loader,setLoader] = useState(true);
    const [error,setError]=useState('');
    const auth = getAuth(app);


    //signup as a new user from firebase docs
    const signUp = async(email,password) =>{
        try{
            setLoader(true);
            return await createUserWithEmailAndPassword(auth, email, password)

        }catch(error){
            setError(error.code)
            throw error;
        }
    }

    //login with user
    const login = async()=>{
        try {
            setLoader(true);
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.code)
            throw error;
        }
    }

    //logout users
    const logout = async()=>{
        try {
            return await signOut(auth)
        } catch (error) {
            setError(error.code)
            throw error;
        }
    }

    //update users profiles
    const updateUser = async(name,photo)=>{
        try {
            setLoader(true);
            await updateProfile(auth.currentUser,{displayName:name,photoURL:photo});
            setUser(auth.currentUser);
        } catch (error) {
            setError(error.code)
            throw error;
        }
    }

    //google login
    const googleprovider = new GoogleAuthProvider();
    const googleLogin = async()=>{
        try {
            return await signInWithPopup(auth, googleprovider)
        } catch (error) {
            setError(error.code)
            throw error;
        }

    }



    //get currently signed in user
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((user)=>{
            setUser(user);
            if(user){
                axios.post('/api/set-token',{email:user.email,name:user.displayName})
                .then((data)=>{
                    if(data.data.token){
                        localStorage.setItem('token',data.data.token)
                        setLoader(false);
                    }
                })
            }else{
                localStorage.removeItem('token')
                setLoader(false);
            }
        })
        return ()=>unsubscribe();
    },[])

    const contextValue = {user,signUp,login,logout,updateUser,googleLogin,error,setError}
  return (
    <AuthContext.Provider value = {contextValue}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
