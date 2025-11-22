'use client'
import React, { useEffect, useState } from 'react'
import TailCard2 from '@/components/TailCard2';
import Link from 'next/link';

const apikey = process.env.NEXT_PUBLIC_TRA_API;
const SESSION_KEY = 'selectedGugun';
interface FestivalItem {
    UC_SEQ: number;
    GUGUN_NM: string;
    MAIN_IMG_NORMAL: string;
    [key: string]: any;
}

export default function FestGallary() {

    const [originalData, setOriginalData] = useState<FestivalItem[]>([]);
    const [tdata, setTdata] = useState<FestivalItem[]>([]);
    const [gdata, setGdata] = useState<string[]>(['전체']);
    const [selectedGugun, setSelectedGugun] = useState('전체');

    const baseurl = 'https://apis.data.go.kr/6260000/FestivalService/getFestivalKr';

    const handleFilter = (gugun: string, dataToFilter: FestivalItem[]) => {
        if (gugun === '전체') {
            setTdata(dataToFilter);
        } else {
            const filtered = dataToFilter.filter(item => item.GUGUN_NM === gugun);
            setTdata(filtered);
        }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newGugun = e.target.value;
        setSelectedGugun(newGugun);
        sessionStorage.setItem(SESSION_KEY, newGugun);
        handleFilter(newGugun, originalData);
    }

    useEffect(() => {
        const getFetchData = async () => {
            let url = `${baseurl}?serviceKey=${apikey}&pageNo=1&numOfRows=50&resultType=json`;

            try {
                const resp = await fetch(url);
                if (!resp.ok) {
                    const text = await resp.text();
                    throw new Error(`HTTP Error ${resp.status}: ${text}`);
                }
                const tdataJson = await resp.json();

                let dataArray = tdataJson.getFestivalKr?.item;

                if (dataArray) {
                    if (!Array.isArray(dataArray)) {
                        dataArray = [dataArray];
                    }

                    setOriginalData(dataArray);
                    
                    const guguns = dataArray
                        .map((item: { GUGUN_NM: any; }) => item.GUGUN_NM)
                        .filter((gugun: any, index: any, self: string | any[]) => gugun && self.indexOf(gugun) === index)
                        .sort();

                    setGdata(['전체', ...guguns]);
                    
                    const initialFilterValue = sessionStorage.getItem(SESSION_KEY) || '전체';
                    setSelectedGugun(initialFilterValue);
                    handleFilter(initialFilterValue, dataArray);

                } else {
                    console.warn("오류:", tdataJson);
                    setOriginalData([]);
                    setTdata([]);
                    setGdata(['전체']);
                }
            } catch (err) {
                console.error("Fetch Error:", err);
                setOriginalData([]);
                setTdata([]);
                setGdata(['전체']);
            }
        }

        getFetchData();
    }, []);

    return (
        <div className='w-full flex flex-col items-center flex-1 '>

            <h1 className='text-5xl mb-8 mt-4 font-semibold '>부산 축제 정보 </h1>

            <div className='flex flex-row '>

                <select
                    className='bg-neutral-700 shadow-2xl p-2 rounded text-white w-50 text-center '
                    value={selectedGugun}
                    onChange={handleChange}>
                    {gdata.map(gugun => (
                        <option key={gugun} value={gugun}>
                            {gugun}
                        </option>
                    ))}
                </select>
            </div>

            <div className='w-full grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-7xl'>
                {
                    tdata.map((item, idx) => (
                        // <Link href={{pathname: "/festival/contents", query: {uc_seq: item.UC_SEQ}}} key={item.UC_SEQ + idx}>
                            <Link href={`/Festival/Contents?uc_seq=${item.UC_SEQ}`} key={item.UC_SEQ + idx}>
                            <TailCard2
                                itemid={item.UC_SEQ}
                                item={item}
                                img={item.MAIN_IMG_NORMAL}
                            />
                        </Link>
                    ))
                }

            </div>
        </div>
    )
}