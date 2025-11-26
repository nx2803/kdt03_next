import React from 'react';
import type { Restaurant } from '@/type/restaurant';
import restaurantData from "@/data/부산맛집.json"
import Link from 'next/link';
import Image from 'next/image';
import { IoRestaurantOutline } from 'react-icons/io5';
import map from "@/assets/map.png"
import NotFound from '@/app/not-found';
import { notFound } from 'next/navigation';
interface RestaurantDetailProps {
  params: Promise<{ id: string }>;
}


export async function generateStaticParams() {
  const restaurants: Restaurant[] = restaurantData;
  return restaurants.map(restaurant => ({ id: String(restaurant.UC_SEQ) }));
}




export default async function RestaurantDetail({ params }: RestaurantDetailProps) {

  const { id } = await params;
  const restaurant = restaurantData.find(item => String(item.UC_SEQ) === id);
  if (restaurant) {
    const imageUrl = restaurant.MAIN_IMG_NORMAL || '';
    const title = restaurant.MAIN_TITLE || '제목 없음';
    // const title = title1.replace(/\s*\(\s*한\s*,\s*영\s*,\s*중간\s*,\s*중번\s*,\s*일\s*\)/, '');
    const location = restaurant.ADDR1 || '위치 정보 없음';
    const menu = restaurant.RPRSNTV_MENU || '메뉴 정보 없음';
    const OverlayClasses = 'absolute inset-0 bg-black/30';
    const tel = restaurant.CNTCT_TEL || '전화번호 없음';
    const time = restaurant.USAGE_DAY_WEEK_AND_TIME || '운영시간 없음';
    const url = restaurant.HOMEPAGE_URL || '';
    const kakaoMapUrl =
      `https://map.kakao.com/link/map/${restaurant.ADDR1},${restaurant.LAT},${restaurant.LNG}`;


    return (
      <div className='flex flex-col h-screen'>
        <div
          data-id={restaurant.UC_SEQ}
          className='relative w-full  overflow-hidden shadow-2xl grow '
        >

          {
            imageUrl ? (
              <Image
                className='absolute inset-0  object-cover '
                src={imageUrl}
                alt={title}
                fill={true}
              />
            ) : (

              <IoRestaurantOutline
                className='w-full h-full p-15 bg-zinc-700 text-white absolute inset-0  object-cover '
              />
            )
          }




          <div className={OverlayClasses}></div>
          <Link href="/Restaurants"

            className='absolute top-4 right-4 z-50 text-3xl text-white bg-black/50 hover:bg-black/70 rounded-full w-13 h-13 flex items-center justify-center transition duration-200'
          >
            ✖
          </Link>

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
              <div className='flex flex-col space-y-2 text-3xl mx-30'>


                <div className='flex justify-between items-start'>
                  <p className="font-bold shrink-0 mr-4">주소</p>
                  <p title="지도보기" className='flex flex-row items-center text-right'>
                    {location}
                    <a href={kakaoMapUrl} className='ml-2 shrink-0' target="_blank" rel="noopener noreferrer">
                      <Image
                        src={map}
                        alt="카카오맵"
                        width={30}
                        height={24}
                      />
                    </a>
                  </p>
                </div>

                {restaurant!.USAGE_DAY_WEEK_AND_TIME && (
                  <div className='flex justify-between items-start'>
                    <p className="font-bold shrink-0 mr-4">운영시간</p>
                    <p className='text-right'>{time}</p>
                  </div>
                )}

                {restaurant!.CNTCT_TEL && (
                  <div className='flex justify-between items-start'>
                    <p className="font-bold shrink-0 mr-4">전화번호</p>
                    <p className='text-right'>{tel}</p>
                  </div>
                )}

                {restaurant!.RPRSNTV_MENU && (
                  <div className='flex justify-between items-start'>
                    <p className="font-bold shrink-0 mr-4">대표메뉴</p>
                    <p className='text-right'>{menu}</p>
                  </div>
                )}

                {restaurant!.HOMEPAGE_URL && (
                  <div className='flex justify-between items-start'>
                    <p className="font-bold shrink-0 mr-4">홈페이지</p>
                    <a href={url} target="_blank" rel="noopener noreferrer" className='hover:text-blue-500 line-clamp-1 text-right break-all'>
                      {url}
                    </a>
                  </div>
                )}

              </div>

              <hr className='border-white my-4' />


              <div className='pt-1'>
                <p className='text-xl line-clamp-15 text-start'>
                  {restaurant!.ITEMCNTNTS}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
  else{
    notFound();
  }
}