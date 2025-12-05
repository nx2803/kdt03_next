import React from 'react';
import Image from 'next/image';
import loader from '@/assets/loader.gif'
import { IoRestaurantOutline } from "react-icons/io5";
import Link from 'next/link';

interface TailCardProps {
    itemid: number;
    item: any;
    route: string;
}



export default function RestCard({ itemid, item, route} : TailCardProps) {
    const imageUrl = item.MAIN_IMG_NORMAL;
    const title1 = item.MAIN_TITLE || '제목 없음';
    const title = title1.replace(/\s*\(\s*한\s*,\s*영\s*,\s*중간\s*,\s*중번\s*,\s*일\s*\)/, '');
    const location = item.ADDR1 || '위치 정보 없음';
    const menu = item.RPRSNTV_MENU || '메뉴 정보 없음';
   

    const overlayClasses = 'absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent';

    return (

        <Link href={`${route}/${itemid}`}
            data-id={itemid}
            className={`relative w-full h-80 rounded overflow-hidden shadow-2xl cursor-pointer 
                       hover:ring-2 hover:ring-yellow-500 transition-all duration-300 group ${imageUrl?'' : 'bg-zinc-600/90'} `} >

            
            {imageUrl!='null' && imageUrl ? (
               
                <Image 
                    className='absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-105' 
                    src={imageUrl} 
                    alt={title} 
                    fill={true}
                />
            ) : (
               
                <IoRestaurantOutline 
                    className='w-full h-full p-15 bg-zinc-700/90 text-yellow-500 transition-transform duration-500 group-hover:scale-105' 
                />
            )}

            <div className={overlayClasses}></div>

            <div className='absolute bottom-0 left-0 right-0 p-5 z-10 text-white flex flex-col space-y-2'>

                <h1 className='text-2xl font-extrabold line-clamp-2 border-b-2 pb-2 text-center border-white' title={title}>
                    {title}
                </h1>

                <p className='text-sm text-gray-300 text-center'>{location}</p>

                
                <p className='text-sm text-gray-300 text-center'>대표메뉴 {menu}</p>
            </div>
        </Link>
    );
}