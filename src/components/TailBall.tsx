import React from 'react'

const BallColor = [
  "border-yellow-400",
  "border-cyan-400",
  "border-red-500",
  "border-zinc-100",
  "border-lime-500"
] as const;

interface TailBallProps {
  n: number;
}

export default function TailBall({n}: TailBallProps) {
  
  return (
    <div className= {`rounded-full m-2 border-2 w-20 h-20 font-bold ${BallColor[Math.floor(n/10)]}
     justify-center items-center text-2xl flex text-gray-100 bg-zinc-900/10`}>
      {n}
    </div>
  )
}
