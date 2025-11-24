import React from 'react';

export default function App01Page() {
  return (
    <div className='w-full flex flex-col justify-start m-5'>
      <h1 className='text-2xl font-semibold mb-4'> 맛집 추천</h1>
      <div className='flex border-2 border-red-600 rounded-sm text-white w-100 p-5 flex-col'>
        <h2 className='text-2xl font-semibold'>파스타 맛집</h2>
        <p>
            파스타 맛있는 집!
        </p>
      </div>
    </div>
  );
}