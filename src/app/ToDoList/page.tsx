'use client'
import React, { useEffect, useState } from 'react'
import ToDoInput from './ToDoInput'
import ToDoItem from './ToDoItem'
import { RiSupabaseFill } from "react-icons/ri";
import { supabase } from "@/supabase/client";
export interface ToDo {
        id: number;
        text: string;
        completed: boolean;
    } 
export default function ToDoList() {
    // const todos = useAtomValue(todosAtom);
    // const comp = useAtomValue(completedAtom);
   
    const [todos, setTodos] = useState<ToDo[]>([]);
    const [comp, setComp] = useState(0);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABSE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABSE_KEY;



    // const getTodos = async () => {
    //     const resp = await fetch(`${supabaseUrl}/rest/v1/todos?select=*&order=id.desc`, {
    //         method: 'GET',
    //         headers: {
    //             'apikey': supabaseKey,
    //             'Authorization': `Bearer ${supabaseKey}`,
    //         }
    //     });
    //     if (resp.ok) {
    //         const data = await resp.json();
    //         setTodos(data);
    //     } else {
    //         console.error('Error fetching todos:', resp.statusText);
    //         setTodos([]);
    //     }
    // }
    const getTodos = async () => {
        const { data, error } = await supabase
            .from('todos')
            .select('*')
            .order('id', { ascending: false });
        if (error) {
            console.error('Error fetching todos:', error);
        } else {
            setTodos(data);
        }
    }
    useEffect(() => {

        setComp(todos.filter(todo => todo.completed).length);
    }, [todos]);

    
    return (
        <div className='flex flex-col w-full justify-center items-center'>
            <div className="mt-10 text-5xl font-semibold text-center flex flex-row ">
                할일 목록(<RiSupabaseFill className='mr-3 text-[#3ecf8e]' />    {' Client 라이브러리 함수'})
            </div>
            <div className='w-200 h-10 my-10 text-white bg-neutral-600/80 rounded text-center flex justify-center items-center'>

                전체 : {todos.length} 개 | 완료 : {comp} 개 | 미완료 : {todos.length - comp} 개
            </div>
            <ToDoInput getTodos={getTodos} />

            {
                todos.map(todo => <ToDoItem key={todo.id} todo={todo} setTodos={setTodos} getTodos={getTodos} />)
            }
        </div>
    )
}
