'use client';
import React from 'react';

import { useState, useEffect } from 'react';
import { Restaurant } from '@/type/restaurant';
import RestCard from '@/components/RestCard';

export default function BusanFoodPage() {
    const [tdata, setTdata] = useState<Restaurant[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchRestaurants = async (pageNum: number) => {
        if (loading) return;

        setLoading(true);
        try {
            const resp = await fetch(`/api/busanFood?page=${pageNum}`);
            if (!resp.ok) {
                throw new Error("맛집 정보를 불러오는데 실패했습니다.");
            }
            const { data, currentPage, totalPages } = await resp.json();

            setTdata((prev) => {
                if (currentPage === 1)
                    return data;
                else
                    return [...prev, ...data]
            });
            
            if (currentPage >= totalPages) {
                setHasMore(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchRestaurants(page);
    }, [page]);

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            setPage((prev) => prev + 1);
        }
    };



    return (
        <div className='w-full flex flex-col items-center flex-1 '>
            <h1 className='text-5xl my-8 font-semibold '>부산 맛집 정보 </h1>
            <div className='w-full grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-7xl'>
                {
                    tdata.map((item, idx) => (
                        <RestCard
                            key={`${item.UC_SEQ}-${idx}`}
                            itemid={item.UC_SEQ}
                            item={item}
                            route="BusanFood"
                        />
                    ))
                }

            </div>
            <button onClick={handleLoadMore} className='border border-yellow-400 p-2 mb-4 rounded text-2xl hover:bg-zinc-600/50 cursor-pointer transition-all duration-100 ease-in-out'>더보기</button>
        </div>
    );
}