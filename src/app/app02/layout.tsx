import Link from 'next/link';
import React from 'react';

export default function App01Layout({ children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        
            <div className='flex flex-col h-full overflow-x-hidden'>
                <aside className=' flex flex-row w-full  bg-neutral-800/70 p-2 pl-4'>
                    <h1 className='my-2 text-2xl w-70 font-semibold'>맛집 카테고리</h1>
                    <nav className=' container mx-70 ' >
                        <ul className=' text-2xl my-2 justify-between items-center flex flex-row gap-2 '>
                            <Link href='/app02/junggu' className='hover:text-red-600'>중구</Link>
                            <Link href='/app02/donggu' className='hover:text-red-600'>동구</Link>
                            <Link href='/app02/seogu' className='hover:text-red-600'>서구</Link>
                            <Link href='/app02/namgu' className='hover:text-red-600'>남구</Link>
                            <Link href='/app02/bukgu' className='hover:text-red-600'>북구</Link>
                        </ul>
                    </nav>
                </aside>
                <div className='flex-1'>
                {children}
                </div>
            </div>
        
    );
}