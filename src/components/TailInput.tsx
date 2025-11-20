import React from 'react'

interface TailInputProps {
  type: string;
  name: string;
  ref?: React.Ref<HTMLInputElement>;
} 

export default function TailInput({type, name, ref} : TailInputProps) {
  return (
    <div>
      <input type={type} name={name} ref={ref} className='bg-white text-black rounded shadow p-3 text-center font-bold'></input>
    </div>
  )
}
