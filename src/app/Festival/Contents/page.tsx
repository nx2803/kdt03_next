'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from "next/navigation";
import map from '@/assets/map.png';
import Image from 'next/image';
import load from '@/assets/load.gif'

interface FestivalItem {
    UC_SEQ: number;
    MAIN_TITLE: string;
    MAIN_IMG_NORMAL: string;
    MAIN_PLACE: string;
    LAT: number;
    LNG: number;
    ITEMCNTNTS: string;
    USAGE_DAY_WEEK_AND_TIME?: string;
    CNTCT_TEL?: string;
    HOMEPAGE_URL?: string;
    [key: string]: any;
}
const apikey = process.env.NEXT_PUBLIC_TRA_API;
const baseurl = 'https://apis.data.go.kr/6260000/FestivalService/getFestivalKr';

export default function FestivalContents() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const ucSeq = searchParams.get('uc_seq');

    const [contents, setContents] = useState<Partial<FestivalItem>>({});
    const [isLoading, setIsLoading] = useState(true);

    const handleClose = () => {
        router.back(); 
    };


    const getContentsData = async (seq: string) => {
        setIsLoading(true);

        let url = `${baseurl}?serviceKey=${apikey}&pageNo=1&numOfRows=100&resultType=json`;
        try {
            const resp = await fetch(url);
            if (!resp.ok) throw new Error(`HTTP Error ${resp.status}`);

            const tdataJson = await resp.json();
            let dataArray = tdataJson.getFestivalKr?.item;

            if (dataArray && !Array.isArray(dataArray)) {
                dataArray = [dataArray];
            }

            if (dataArray) {
                const foundItem = dataArray.find((item: FestivalItem) => item.UC_SEQ.toString() === seq);
                if (foundItem) {
                    setContents(foundItem);
                } else {
                    console.error("해당 ID의 축제 정보를 찾을 수 없습니다.");
                }
            }
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (ucSeq) {
            getContentsData(ucSeq);
        } else {
            setIsLoading(false);
        }
    }, [ucSeq]);

    if (isLoading) {
        return (
            <div className='flex justify-center  items-center h-screen text-4xl'>
                <Image src={load} width={100} height={100} alt="로딩중" />
            </div>
        );
    }

    if (!contents.MAIN_TITLE) {
        return (
            <div className='flex justify-center items-center h-screen text-4xl flex-col'>
                <p>축제 정보가 없습니다.</p>
                <button onClick={handleClose} className='mt-4 text-xl text-blue-500'>돌아가기</button>
            </div>
        );
    }

    // ... (기존 렌더링 로직은 그대로 사용)
    const OverlayClasses = 'absolute inset-0 bg-black/20';
    let title = (contents.MAIN_TITLE || '제목 없음').replace(/\s*\(\s*한\s*,\s*영\s*,\s*중간\s*,\s*중번\s*,\s*일\s*\)/, '');
    const kakaoMapUrl =
        `https://map.kakao.com/link/map/${contents.MAIN_PLACE?.replace(',', '').replace('', '')},${contents.LAT},${contents.LNG}`;

    return (
        <div
            data-id={contents.UC_SEQ}
            className='relative w-full grow rounded-xl overflow-hidden shadow-2xl '
        >
            {/* ... (이하 렌더링 코드는 기존과 동일) */}
            <img
                className='absolute inset-0 w-full h-full object-cover '
                src={contents.MAIN_IMG_NORMAL}
                alt={title}
            />


            <div className={OverlayClasses}></div>
            <button
                onClick={handleClose}
                className='absolute top-4 right-4 z-50 text-3xl text-white bg-black/50 hover:bg-black/70 rounded-full w-13 h-13 flex items-center justify-center transition duration-200'
            >
                ✖
            </button>

            <div className='absolute top-0 left-0 right-0 p-4 z-20 text-white'>
                <h1
                    className='text-5xl font-bold line-clamp-2 mt-5 text-center'
                    title={title}
                >
                    {title}
                </h1>
            </div>



            <div className='absolute bottom-0 left-0 right-0 p-6 z-10 text-white flex flex-col space-y-4 '>
                <div className='pt-8'>
                    <div className='grid grid-cols-2 gap-x-4 gap-y-2 text-3xl'>
                        <div className='flex flex-col  space-y-2 '>
                            <p>주소</p>
                            {contents.USAGE_DAY_WEEK_AND_TIME && <p>날짜</p>}
                            {contents.CNTCT_TEL && <p>전화번호</p>}
                            {contents.HOMEPAGE_URL && <p>홈페이지</p>}
                        </div>

                        <div className='flex flex-col space-y-2 text-3xl justify-center text-center text-white'>
                            <p title="지도보기" className='flex flex-row justify-center items-center' >{contents.ADDR1} <a href={kakaoMapUrl} className='ml-2' target="_blank">
                                <Image
                                    src={map}
                                    alt="카카오맵"
                                    width={30}   
                                    height={24}
                                />
                            </a></p>
                            {contents.USAGE_DAY_WEEK_AND_TIME && <p>{contents.USAGE_DAY_WEEK_AND_TIME}</p>}
                            {contents.CNTCT_TEL && <p>{contents.CNTCT_TEL}</p>}
                            {contents.HOMEPAGE_URL && <a href={contents.HOMEPAGE_URL} target="_blank" className='hover:text-blue-500 line-clamp-1'>{contents.HOMEPAGE_URL}</a>}
                        </div>
                    </div>

                    <hr className='border-white my-4' />


                    <div className='pt-1'>
                        <p className='text-xl line-clamp-15 text-start'>
                            {contents.ITEMCNTNTS}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}