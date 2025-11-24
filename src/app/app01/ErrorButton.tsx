'use client';

import React from 'react';
import { useState } from 'react';
export default function ErrorButton() {
    const [error, setError] = useState(false);

    if (error) {
        throw new Error("에러 테스트용 에러")
    }
    return (
        <div className='w-40 h-15 flex justify-center items-center mt-10 border-2 border-red-600 rounded text-white font-bold cursor-pointer' onClick={() => setError(true)}>
            에러 발생시키기
        </div>
    );
}