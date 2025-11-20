import React from 'react'

const BallColor = [
  "border-amber-400",
  "border-cyan-400",
  "border-red-400",
  "border-zinc-300",
  "border-lime-400"
] as const;

interface TailBallProps {
  n: number;
}

export default function TailBall({n}: TailBallProps) {
  
  return (
    <div className= {`rounded-full m-2 border-3 w-20 h-20 font-bold ${BallColor[Math.floor(n/10)]}
     justify-center items-center text-2xl flex text-white`}>
      {n}
    </div>
  )
}
