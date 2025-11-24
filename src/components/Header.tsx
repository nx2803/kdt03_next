'use client'
import React from 'react'
import Image from "next/image";
import Link from 'next/link';
import { supabase } from '@/supabase/client';
import { useAtomValue } from 'jotai';
import { sessionAtom } from '@/AtomAuth';
import carbon from '../assets/carbon.png'
export default function Header() {
  const session = useAtomValue(sessionAtom);
  const signOut = async () => {
    await supabase.auth.signOut();
  };


  return (
    <header className="">
      <nav className=" flex flex-row items-center justify-between font-bold bg-zinc-950/70 border-b-4 border-red-600/90 ">
        <Link href="/" className="font-bold cursor-pointer text-2xl text-zinc-100 hover:text-red-600 transition-all  duration-200 ease-in-out p-4">KDT Next.js</Link>


        <ul className="flex space-x-4 text-xl p-4 text-neutral-100">
          <Link href="/Lotto" className="cursor-pointer hover:text-red-600 transition-all  duration-200 ease-in-out">로또</Link>
          <Link href="/Festival" className="cursor-pointer hover:text-red-600 transition-all  duration-200 ease-in-out">축제</Link>
          <Link href="/ToDoList" className="cursor-pointer hover:text-red-600 transition-all  duration-200 ease-in-out">Todo</Link>
          <Link href="/Restaurants" className="cursor-pointer hover:text-red-600 transition-all  duration-200 ease-in-out">맛집</Link>
          

        </ul>

      </nav>
      {/* <div className="h-0.5 bg-yellow-400" /> */}
    </header>
  )


}
