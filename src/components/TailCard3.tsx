// import React from 'react';
// import Link from 'next/link';

// interface TailCard3Props {
//     data?: any[];
//     stat: statusMapt;
// }
//  const statusMap = {
//         '1': '통신이상',
//         '2': '충전가능',
//         '3': '충전중',
//         '4': '운영중지',
//         '5': '점검중',
//         '9': '예약가능',
//         '0': '알 수 없음'
//     };
//     type statusMapt = keyof typeof statusMap;

// const getBorderColorClass = (stat : string) => {
//     switch (stat) {
//         case '2':
//             return 'bg-linear-to-tl from-neutral-800 from 70% to-green-500/40 border-green-500';
//         case '3':
//             return 'bg-linear-to-tl from-neutral-800 to-yellow-500/50 border-yellow-500';
//         case '4':
//         case '5':
//             return 'bg-linear-to-tl from-neutral-800 to-red-500 border-red-500';
//         case '9':
//             return 'bg-linear-to-tl from-neutral-800 to-cyan-500/50 border-cyan-500';
//         default:
//             return 'bg-linear-to-tl from-neutral-800 to-neutral-500/50 border-neutral-300';
//     }
// };

// const StatusBadge = ({ stat } :TailCard3Props) => {
//     let colorClass;
//     let statusText;

   
//     statusText = statusMap[stat] || '미확인';
    

//     if (stat === '2') colorClass = 'bg-green-600 text-white';
//     else if (stat === '3') colorClass = 'bg-yellow-600 text-white';
//     else if (stat === '4' || stat === '5') colorClass = 'bg-red-600 text-white';
//     else if (stat === '9') colorClass = 'bg-cyan-600 text-white';
//     else colorClass = 'bg-neutral-600 text-white';

//     return (
//         <span className={`px-3 py-1 text-base font-semibold rounded-full ${colorClass}`}>
//             {statusText}
//         </span>
//     );
// };


// export default function TailCard3({ data } : TailCard3Props) {
//     if (!data || data.length === 0) {
//         return null;
//     }

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 p-2">
//             {data.map((item, index) => {
//                 const bgColorClass = getBorderColorClass(item.stat);

//                 return (
//                     <Link href="/Charge/contents" state={{contents:item}} key={`${item.statId}-${item.chgerId}-${index}`}>
//                         <div
                            

//                             className={` rounded p-6 border-3 ${bgColorClass} transition duration-300 transform hover:scale-[1.02] relative overflow-hidden shadow-2xl shadow-black/50`}
//                         >


//                             <div className="flex justify-center items-center mb-5 pb-3 border-b-2 border-white">

//                                 <h3 className="text-2xl font-bold text-white mr-2 line-clamp-1">{item.statNm}</h3>
//                             </div>


//                             <div className='pb-10'>
//                                 <p className="text-sm text-white mb-2 flex items-start">
//                                     <span className="font-semibold w-24 text-white shrink-0">주소</span>
//                                     <span className='ml-2 text-pretty'>{item.addr}</span>
//                                 </p>

//                                 <p className="text-sm text-white mb-2 flex items-start">
//                                     <span className="font-semibold w-24 text-white shrink-0">운영기관</span>
//                                     <span className='ml-2 text-pretty '>{item.busiNm} ({item.busiCall})</span>
//                                 </p>

//                                 <p className="text-sm text-white mb-2 flex items-start">
//                                     <span className="font-semibold w-24 text-white shrink-0">충전기 정보</span>
//                                     <span className='ml-2 text-pretty'>타입: {item.chgerType} / 출력: {item.output}kW</span>
//                                 </p>

//                                 <p className="text-sm text-white mb-3 flex items-start">
//                                     <span className="font-semibold w-24 text-white shrink-0">이용시간</span>
//                                     <span className='ml-2 text-wrap'>{item.useTime}</span>
//                                 </p>
//                             </div>


//                             <div className='absolute bottom-4 inset-x-0 w-max mx-auto'>
//                                 <StatusBadge stat={item.stat} />
//                             </div>
//                         </div>
//                     </Link>
//                 );
//             })}
//         </div>

//     );
// }