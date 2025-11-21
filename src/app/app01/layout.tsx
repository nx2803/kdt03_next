import Link from 'next/link';
import React from 'react';

export default function App01Layout({ children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
    
            <div className='flex h-full overflow-x-hidden'>
                <aside className='w-65 bg-neutral-600/20 p-2 pl-4'>
                    <h1 className='mt-2 mb-3 text-2xl font-semibold'>맛집 카테고리</h1>
                    <nav >
                        <ul className='mt-2 flex flex-col gap-2'>
                            <Link href='/app01/junggu' className='hover:text-yellow-400'>중구</Link>
                            <Link href='/app01/donggu' className='hover:text-yellow-400'>동구</Link>
                            <Link href='/app01/seogu' className='hover:text-yellow-400'>서구</Link>
                            <Link href='/app01/namgu' className='hover:text-yellow-400'>남구</Link>
                            <Link href='/app01/bukgu' className='hover:text-yellow-400'>북구</Link>
                        </ul>
                    </nav>
                </aside>
                <div className='flex-1'>
                {children}
                </div>
            </div>
       
    );
}