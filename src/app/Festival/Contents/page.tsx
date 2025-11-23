
import { Suspense } from 'react';
import ContentsClient from './contents'; // 

export default function Page() {
    return (
        
        <Suspense fallback={
            <div className='flex justify-center items-center h-screen text-4xl'>
                로딩
            </div>
        }>
            
            <ContentsClient />
        </Suspense>
    );
}