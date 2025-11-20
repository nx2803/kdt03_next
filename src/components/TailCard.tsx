import React from 'react';

interface TailCardProps {
    itemid: number;
    item: any;
}

export default function TailCard({ itemid, item }: TailCardProps) {
    const imageUrl = item.galWebImageUrl || '';
    const title = item.galTitle || '제목 없음';
    const location = item.galPhotographyLocation || '위치 정보 없음';
    const keywords = item.galSearchKeyword || '';

    const overlayClasses = 'absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent';

    return (

        <div
            data-id={itemid}
            className='relative w-full h-96 rounded overflow-hidden shadow-2xl cursor-pointer 
                       hover:ring-3 hover:ring-white transition-all duration-300 group'>

            <img className='absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' src={imageUrl} alt={title}/>

            <div className={overlayClasses}></div>

            <div className='absolute bottom-0 left-0 right-0 p-5 z-10 text-white flex flex-col space-y-2'>

                <h1 className='text-2xl font-extrabold line-clamp-2  border-b-2 boredr-white pb-2' title={title}>
                    {title}
                </h1>

                <p className='text-sm text-gray-300'>{location}</p>

                <div className='pt-1 flex flex-wrap gap-1'>
                    {keywords.split(',').map((keyword : string, index : number) => {
                        const trimmedKeyword = keyword.trim();
                        if (trimmedKeyword) {
                            return (
                                <span key={index} className='inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded'>
                                    #{trimmedKeyword}
                                </span>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    );
}