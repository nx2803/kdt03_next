import Image from "next/image";
import star from "@/assets/star.webp"
export default function Loading() {
    return <div className="flex w-full h-full justify-center items-center sweet-loading">
        
        <Image src={star} alt="로딩"/>
  
    </div>;
}