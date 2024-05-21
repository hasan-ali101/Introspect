import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="relative h-20 w-20">
        <Image
          className="w-full"
          src="/book3.png"
          alt="book"
          width={275}
          height={370}
        />
        <div className="absolute left-[1px] top-[5px] h-[102px] w-[74px] bg-violet-300"></div>
      </div>
    </main>
  );
}
