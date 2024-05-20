import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useUser } from '../../../../hooks/useUser';
import { Navigate } from 'react-router-dom';

const CheckOutPayment = ({price,cartItem}) => {
    const stripe = useStripe();
  const elements = useElements();
    const URL = `https://smart-class-hub.onrender.com/payment-info?${cartItem && `classId=${cartItem}`}`
    const axiosSecure = useAxiosSecure();
    const {currentUser,isLoading} = useUser();
    const [clientSecret,setClientSecret] = useState('');
    const [succeeded,setSucceeded] = useState('');
    const [message,setMessage] = useState('')
    const [cart,setCart] = useState([])


    if(price < 0 && !price){
        return <Navigate to ='dashboard/my-selected' replace/>
    }

    useEffect(() => {
        axiosSecure.get(`/cart/${currentUser?.email}`).then((res)=>{
            const classesId = res.data.map(item => item._id)
            setCart(classesId)
        }).catch((err)=>console.log(err))
        /*
        if (!stripe) {
          return;
        }
    
        const clientSecret = new URLSearchParams(window.location.search).get(
          "payment_intent_client_secret"
        );
    
        if (!clientSecret) {
          return;
        }
    
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
          switch (paymentIntent.status) {
            case "succeeded":
              setMessage("Payment succeeded!");
              break;
            case "processing":
              setMessage("Your payment is processing.");
              break;
            case "requires_payment_method":
              setMessage("Your payment was not successful, please try again.");
              break;
            default:
              setMessage("Something went wrong.");
              break;
          }
        });*/
      }, [stripe]);
    // console.log(cart) 

    useEffect(() => {
        axiosSecure.post('/create-payment-intent',{price:price}).then(res=>{
            //console.log(res.data)
            setClientSecret(res.data.clientSecret)
        })
    }, []);
    const handleSubmit=async(e)=>{
        setMessage('')
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if(card === null){
            return
        }
        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card
        });
        if(error){
            console.log(error);
            setMessage(error.message);
        }else{
            console.log('[PaymentMethod]',paymentMethod)
        }
        const {paymentIntent,error:confirmError} = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:card,
                billing_details:{
                    name:currentUser?.name || "Unknown",
                    email:currentUser?.email || "Anonymous",
                }
            }
        })
        if(confirmError){
            console.log("[Confirm Error]",confirmError)
        }else{
            console.log("[Payment Intent]",paymentIntent)
            if(paymentIntent.status === "succeeded"){
                const transactionId = paymentIntent.id;
                const paymentMethod = paymentIntent.payment_method;
                const amount = paymentIntent.amount/100;
                const currency = paymentIntent.currency;
                const paymentStatus = paymentIntent.status;
                const userName = currentUser?.name;
                const userEmail = currentUser?.email;

                const data = {
                    transactionId,
                    paymentMethod,
                    amount,
                    currency,
                    paymentStatus,
                    userName,
                    userEmail,
                    classesId:cartItem ? [cartItem] : cart,
                    date:new Date()
                }
                //console.log(data)
                fetch(URL,{
                    method:"POST",
                    headers:{
                        "Content-Type" : "application/json",
                        authorization:`Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(data)

                }).then(res=>res.json()).then(res=>{
                    //console.log(res)
                    if(res.deletedResult.deletedCount > 0 && res.paymentResult.insertedId &&  res.updatedResult.modifiedCount>0){
                        setSucceeded("Payment Successful! You can access the classes now")
                        //Navigate('/dashboard/enrolled-class')     ---this is wrong
                    }else{
                        setSucceeded("Payment Failed, Please Try again")
                    }
                }).catch(err=>console.log(err))
            }
        }
    }
  return (
    <div>
      <div className='text-center'>
        <h1 className='text-2xl font-bold'>
            Payment Amount : <span className='text-secondary'>{price}</span>
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
      <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: 'black',
                                '::placeholder': {
                                    color: 'black',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
        />
        <button type="submit" disabled={!stripe || !clientSecret || isLoading}>
                    Pay
        </button>
        {message && <p className="text-red-500">{message}</p>}
        {succeeded && <p className="text-green-500">{succeeded}</p>}

      </form>
    </div>
  )
}

export default CheckOutPayment
