import React from 'react';
import ErrorButton from './ErrorButton';

async function getFetch() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {name: '맛있는 파스타 집!'}
}


export default async function  App01Page() {
  const restaurant = await getFetch();
  return (
    <div className='w-full flex flex-col justify-start m-5'>
      <h1 className='text-2xl font-semibold mb-4'> 맛집 추천</h1>
      <div className='flex border border-yellow-400 rounded-sm text-white w-100 p-5 flex-col'>
        <h2 className='text-2xl font-semibold'>{restaurant.name}</h2>
        <p>
            파스타 맛있는 집!
        </p>
        
      </div>
      <ErrorButton/>
    </div>
  );
}