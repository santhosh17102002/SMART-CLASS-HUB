import React, { useEffect } from 'react'
import axios from "axios";
function useAxiosFetch() {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000/',
    });

    //interceptors taken from axios api
    useEffect(()=>{
        //request interceptor
        const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
          return config;
        });


          //response interceptor
          const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
              throw error;
            }
          );

          return ()=>{
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
          }
    },[axiosInstance])
  return axiosInstance;
}

export default useAxiosFetch
