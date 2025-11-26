import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center grow h-full">
            <h2 className="text-red-600 text-9xl font-semibold mb-5">404</h2>
            <p>Could not find requested resource</p>

            <Link href="/app01" className="mt-2 hover:text-red-600">
            돌아가기
            </Link>
        </div>
    );
}