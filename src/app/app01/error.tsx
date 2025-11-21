'use client';

import ErrorButton from "./ErrorButton";

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    return (
        <div className="w-full flex flex-col justify-start m-5">
            <h2 className="text-9xl font-extrabold text-red-700">에러!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h2>
            <p>{error.message}</p>

            <div className='w-40 h-15 flex justify-center items-center mt-10 border border-yellow-400 rounded text-white font-bold cursor-pointer' onClick={() => reset()}>
                에러 진정시키기
            </div>
        </div>
    );
}