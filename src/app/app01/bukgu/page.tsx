import React from 'react';

export default function JungguPage() {
  return (
    <div className='w-full flex flex-col justify-start m-5'>
      <h1 className='text-2xl font-semibold mb-4'>북구 맛집 추천</h1>
      <div className='flex border border-red-600 rounded-sm text-white w-100 p-5 flex-col'>
        <h2 className='text-2xl font-semibold'>국밥집 맛집</h2>
        <p>
            국밥 맛있는 집!
        </p>
      </div>
    </div>
  );
}