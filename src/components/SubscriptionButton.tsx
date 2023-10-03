"use client"

import React from 'react';
import { Button } from './ui/button';
import axios from 'axios';

type SubscriptionButtonProps = {
    isPro : boolean
}

export const SubscriptionButton = ({isPro}: SubscriptionButtonProps) => {

    const [loading , setLoading] = React.useState(false)

    const handleSubscribe = async() => {
        setLoading(true)
        try {
            const response = await axios.get('/api/stripe')
            window.location.href = response.data.url
        } catch (error) {
            console.log("billing error")
        }
        finally{
            setLoading(false)
        }
     
    }

  return (
    <Button
    className='mt-4'
    disabled={loading}
    onClick={handleSubscribe}
    >
       {
        isPro ? "Manage Subscription" : "upgrade"
       }
    </Button>
  );
};