'use client'
import React, { useEffect, useState } from 'react'
import ToDoInput from './ToDoInput'
import ToDoItem from './ToDoItem'

export interface ToDo {
        id: number;
        text: string;
        completed: boolean;
    } 
const api_url = '/api/todo'


export default function ToDoList() {

    const [todos, setTodos] = useState<ToDo[]>([]);
    const [comp, setComp] = useState(0);
    


    const getTodos = async () => {
        const response = await fetch(`${api_url}`);
            
        if (!response.ok) {
            console.error('Error fetching todos');
        } else {
            const data = await response.json();
            setTodos(data as ToDo[]);
        }
    }
    useEffect(() => {
        getTodos();
    }, []);

    useEffect(() => {

        setComp(todos.filter(todo => todo.completed).length);

    }, [todos]);

    
    return (
        <div className='flex flex-col w-full justify-center items-center'>
            <div className="mt-10 text-5xl font-semibold text-center flex flex-row ">
                할일 목록(   {' Client 라이브러리 함수'})
            </div>
            <div className='w-200 h-10 my-10 text-white bg-neutral-700/80 rounded text-center flex justify-center items-center'>

                전체 : {todos.length} 개 | 완료 : {comp} 개 | 미완료 : {todos.length - comp} 개
            </div>
            <ToDoInput getTodos={getTodos} />

            {
                todos.map(todo => <ToDoItem key={todo.id} todo={todo} setTodos={setTodos} getTodos={getTodos} />)
            }
        </div>
    )
}
