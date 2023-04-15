import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from "next/router";
import { useAuth } from '@clerk/nextjs';
// import { useAuth } from "@clerk/nextjs";
import React from 'react';
import { SignIn,SignInButton } from "@clerk/clerk-react";
import Router from 'next/router'


const inter = Inter({ subsets: ['latin'] })


function app() {

  const { isLoaded, userId, sessionId ,getToken} = useAuth();

  if(userId) {
    Router.push('/todos')
  }
  else {

    console.log("no userId");
    console.log(userId);
  }


  return (


    <main className="h-screen pt-4 w-full flex flex-col items-center bg-white">


  <div className="w-full h-auto bg-stone-900 border-4 border-slate-900">
    <h1 className="text-white font-bold text-6xl pl-16 pt-16"> Homework 2 by Andrew Amakye Ansah</h1>
    <h2 className="text-white font-normal text-2xl pl-16 pt-8"><Link href="todos">Access To Do List</Link></h2>
    <h2 className="text-white font-normal text-2xl pl-16 pt-8"><Link href="testy">Testy Test Test Test</Link></h2>
    <h3 className="text-white font-normal text-lg pl-16 pt-4">View Completed Items</h3>

    <div className='ml-16'>    <SignIn />
</div>
  </div>


    </main>

  );
};

export default app;