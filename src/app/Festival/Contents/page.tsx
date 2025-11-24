
import { Suspense } from 'react';
import ContentsClient from './contents'; // 

export default function Page() {
    return (
        
        <Suspense>
            
            <ContentsClient />
        </Suspense>
    );
}