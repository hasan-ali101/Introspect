import { Inter } from "next/font/google";
import Book from "@/components/book";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Book
        title="My 2024 meditation journal"
        color="bg-blue-300"
        label={false}
        text={"text-black"}
        notebook={true}
      />
    </main>
  );
}
