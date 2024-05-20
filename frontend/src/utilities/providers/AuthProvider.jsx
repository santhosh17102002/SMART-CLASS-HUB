import React, { createContext, useEffect, useState } from 'react'
import { app } from '../../config/firebase.init';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import axios, { Axios } from 'axios';
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
    const login = async(email,password)=>{
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
            setLoader(true);
            return await signInWithPopup(auth, googleprovider)
        } catch (error) {
            setError(error.code)
            throw error;
        }

    }



    //get currently signed in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
      
          if (user) {
            const fetchData = async () => {
              try {
                const response = await axios.post('https://smart-class-hub.onrender.com/api/set-token', {
                  email: user.email,
                  name: user.displayName,
                });
      
                if (response.data && response.data.token) {
                  localStorage.setItem('token', response.data.token);
                } else {
                  console.error("Failed to retrieve token from API");
                }
              } catch (error) {
                console.error("Error fetching token:", error);
              } finally {
                setLoader(false); // Set loader to false regardless of success or error
              }
            };
      
            fetchData();
          } else {
            localStorage.removeItem('token');
            setLoader(false);
          }
        });
      
        return () => unsubscribe();
      }, [auth]);
      

    const contextValue = {user,loader,setLoader,signUp,login,logout,updateUser,googleLogin,error,setError}
  return (
    <AuthContext.Provider value = {contextValue}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
