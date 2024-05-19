import React from 'react'
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Navigate, useLocation } from 'react-router-dom';
import './Payment.css'
import CheckOutPayment from '../CheckOutPayment';
//import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE);

const Payment = () => {
    const location = useLocation();
    const price = location?.state?.price;
    const cartItem = location?.state?.itemId;
    if(!price) {
        return <Navigate to='/dashboard/my-selected'/>
    }
  return (
    <div className='my-40 stripe-custom-class'>
      <Elements  stripe={stripePromise}>
          <CheckOutPayment price={price} cartItem = {cartItem}/>
        </Elements>
    </div>
  )
}

export default Payment
