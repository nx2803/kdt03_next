import React from 'react';

interface TailCardProps {
    itemid: number;
    item: any;
    img: string;
}

export default function TailCard({ itemid, item, img } : TailCardProps) {
    const imageUrl = item.galWebImageUrl || '';
    const title1 = item.MAIN_TITLE || '제목 없음';
    const title = title1.replace(/\s*\(\s*한\s*,\s*영\s*,\s*중간\s*,\s*중번\s*,\s*일\s*\)/, '');
    const location = item.ADDR1 || '위치 정보 없음';
    const day = item.USAGE_DAY_WEEK_AND_TIME || '시간 정보 없음';

    const overlayClasses = 'absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent';

    return (

        <div
            data-id={itemid}
            className='relative w-full h-96 rounded overflow-hidden shadow-2xl cursor-pointer 
                       hover:ring-2 hover:ring-red-600 transition-all duration-300 group'>

            <img className='absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' src={img} alt={title}/>

            <div className={overlayClasses}></div>

            <div className='absolute bottom-0 left-0 right-0 p-5 z-10 text-white flex flex-col space-y-2'>

                <h1 className='text-2xl font-extrabold line-clamp-2 border-b-2 pb-2 text-center border-white' title={title}>
                    {title}
                </h1>

                <p className='text-sm text-gray-300 text-center'>{location}</p>

                <p className='text-white font-bold text-center '>
                    {day}
                </p>
            </div>
        </div>
    );
}