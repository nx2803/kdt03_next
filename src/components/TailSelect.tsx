import React, { useEffect, useState } from 'react'

interface TailSelectProps {
    id: string;
    title: string;
    ref: React.Ref<HTMLSelectElement>;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
    className?: string;
    opk: string[];
    opv: string[];
}

export default function TailSelect({ title, ref, opk, opv, handleChange, disabled, className }: TailSelectProps ) {

    return (
        <div className={`flex flex-col justify-center items-center bg-zinc-700 rounded text-white shadow-2xl ${className}`}>
            <label htmlFor={title} className='h-10  flex justify-center items-center'>
                {title}
            </label>
            <select className={`bg-zinc-700 text-white w-full h-10 rounded-b border-t-1 border-gray-400/50 text-center appearance-none `} onChange={handleChange} disabled={disabled} ref={ref}>
                <option value=""> - </option>
                {
                    opk.map((op, idx) =>
                        <option key={op} value={op}>
                            {opv[idx]}
                        </option>
                    )
                }
            </select>
        </div>
    )
}
