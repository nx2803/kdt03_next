'use client'; 
import React from 'react';
import { useRouter } from 'next/navigation';



export default function CloseButton() {
    const router = useRouter();
  return (
    <button 
      onClick={() => router.back()} 
      className='absolute top-4 right-4 z-50 text-3xl text-white bg-black/50 hover:bg-black/70 rounded-full w-13 h-13 flex items-center justify-center transition duration-200'
    >
      ✖
    </button>
  );
}