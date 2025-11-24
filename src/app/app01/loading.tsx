import Image from "next/image";
import star from "@/assets/star.webp"
import load from "@/assets/loader.gif"
export default function Loading() {
    return <div className="flex w-full h-full justify-center items-center sweet-loading">
        
        <Image src={load} alt="로딩"/>
  
    </div>;
}