'use client'
import React, { useEffect } from 'react'
import TailButton from '@/components/TailButton'
import { useRef } from 'react'
import { FaPen } from "react-icons/fa";


interface ToDoInputProps {
    getTodos: () => void;
}

export default function ToDoInput({ getTodos }: ToDoInputProps) {

    const inRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getTodos();
    }, [])


    const handleAdd = async () => {
        if (inRef.current === null) return;
        if (inRef.current.value == "") {
            alert("값을 입력해 주세요.");
            inRef.current.focus();
            return
        }
        const api_url = '/api/todo';
        try {
            const response = await fetch(`${api_url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({text: inRef.current.value, completed: false })
            });
            if (!response.ok) {
                throw new Error('데이터 추가 실패');
            }
            
            inRef.current.value = "";
            inRef.current.focus();
            await getTodos();
            
        } catch (error) {
            console.error('Error adding todo:', error);
        }


    }
    const handleKeyDown = (e: { key: string; }) => {
        if (e.key == 'Enter') {
            handleAdd();
        }

    }


    return (
        <div className='flex flex-row gap-4 mb-10'>
            <input type="text" ref={inRef} className="w-200 h-14 bg-white text-black rounded text-xl shadow text-center font-bold" onKeyDown={handleKeyDown} placeholder='여기에 할 일 입력' />
            {/* <TailButton color="gray" caption={<FaPen className='text-3xl' />} onClick={handleAdd} /> */}

        </div>

    )
}
