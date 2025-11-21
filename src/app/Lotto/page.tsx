'use client'
import React, { useState } from 'react'
import TailBall from '@/components/TailBall'
import TailButton from '@/components/TailButton'
import { FaPlus } from "react-icons/fa";

export default function Lotto() {
  
  const genNum = () => {

    const num = new Set<number>();
    while (num.size < 7) {
      num.add(Math.floor(Math.random() * 45) + 1);
    }
    const Num = Array.from(num);
    const bonus = Num[6];
    const mainN = Num.slice(0, 6);
    mainN.sort((a, b) => a - b);
    mainN.push(bonus);
    // return Array.from(num).sort((a, b) => a - b);

    return mainN;

  };
  const [num, setNum] = useState<number[]>([]);

  const handleNum = () => {

    setNum(genNum());

  };


  return (
    <div className='w-full h-full flex flex-col justify-center items-center overflow-hidden pb-5'>
      <div className='flex flex-row justify-center items-center overflow-hidden text-white py-10'>
        <TailBall n={num[0]} /><TailBall n={num[1]} /><TailBall n={num[2]} /><TailBall n={num[3]} /><TailBall n={num[4]} /><TailBall n={num[5]} /><FaPlus className='text-4xl' /><TailBall n={num[6]} />

      </div>
      <TailButton caption="로또번호생성" color="by" onClick={handleNum} className="mb-5" />
    </div>
  )
}
