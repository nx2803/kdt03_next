import React from 'react'
const BTStyle = {
    blue: {
        base: "bg-blue-400",
        hover: "bg-blue-600",
        text: "text-white"
    },
    orange: {
        base: "bg-orange-400",
        hover: "bg-orange-600",
        text: "text-white"
    },
    lime: {
        base: "bg-lime-400",
        hover: "bg-lime-700",
        text: "text-white"
    },
    white: {
        base: "bg-white",
        hover: "bg-neutral-400",
        text: "text-black"
    },
    gray: {
        base: "bg-neutral-700",
        hover: "bg-neutral-800",
        text: "text-white"
    },
    cyan: {
        base: "bg-[#39b4ca]",
        hover: "bg-cyan-700",
        text: "text-white"
    },
    red: {
        base: "bg-red-700",
        hover: "bg-red-800",
        text: "text-white"
    },
    navy: {
        base: "bg-blue-950",
        hover: "bg-blue-950",
        text: "text-white"
    },
    pink: {
        base: "bg-pink-400",
        hover: "bg-pink-600",
        text: "text-white"
    },
    bp: {
        base: "bg-gray-700",
        hover: "bg-linear-65 from-cyan-500/80 to-pink-400/80",
        text: "text-white"
    },
    bps: {
        base: "bg-linear-65 from-cyan-500/80 to-pink-400/80",
        hover: "bg-linear-65 from-cyan-500/80 to-pink-400/80",
        text: "text-white"
    },
    bg: {
        base: "bg-gray-700",
        hover: "bg-gray-800",
        text: "text-white"
    },
    by: {
        base: "bg-zinc-700",
        hover: "bg-yellow-500",
        text: "text-white"
    }

} as const

interface TailButtonProps {
    color: keyof typeof BTStyle;
    caption: any;
    onClick: () => void;
    className?: string;
}

export default function TailButton({ color, caption, onClick, className }: TailButtonProps) {
    const btstyle = BTStyle[color];
    return (
        <div>
            <button className={`${btstyle.base} rounded ${btstyle.text} hover:${btstyle.hover} px-5 py-3 cursor-pointer transition-all duration-100 ease-in-out ${className}`} onClick={onClick}>{caption}</button>
        </div>
    )
}
