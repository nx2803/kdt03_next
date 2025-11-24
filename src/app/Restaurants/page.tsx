import React from 'react';
import type { Restaurant } from '@/type/restaurant';
import restaurantData from "@/data/부산맛집.json"
import Link from 'next/link';
import RestCard from '@/components/RestCard';


export default function RestaurantPage() {
    return (
        <div className='w-full flex flex-col items-center flex-1 '>
            <h1 className='text-5xl my-8 font-semibold '>부산 맛집 정보 </h1>
            <div className='w-full grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-7xl'>
                {
                    restaurantData.map((item, idx) => (
                        <RestCard
                            key={item.UC_SEQ}
                            itemid={item.UC_SEQ}
                            item={item}
                        />
                    ))
                }

            </div>
        </div>
    );
}