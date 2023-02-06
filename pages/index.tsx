import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // log env variable api_key
  const router = useRouter();

  useEffect(() => {
    // check if token exists
      const token = localStorage.getItem('token');
      if(token) {
          fetch('/api/users/validate', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({token})
          })
          .then(res => res.json())
          .then(data => {
              if(!data.ok) {
                  router.push('/login');
              }
          });
      } else{
        router.push('/login')
      } 
  }, []);

  console.log(process.env.API_KEY)
  return (
    <>
    HOLA MUNDO!!!!!!!!!!!!!!
    </>
  )
}
