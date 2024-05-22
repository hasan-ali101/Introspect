import { Inter } from "next/font/google";
import Book from "@/components/book";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export default function Write() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-10 ${inter.className}`}
    >
      <div className="flex items-start p-6">
        <Carousel>
          <CarouselContent>
            <CarouselPrevious />
            <CarouselItem className="flex w-20 justify-center py-4">
              <div className="flex flex-col items-center gap-6">
                <p className="text-center text-sm font-semibold">
                  {"My 2024 meditation journal"}
                </p>
                <Book
                  title="My 2024 meditation journal"
                  color="bg-red-300"
                  label={false}
                  text={"text-black"}
                  notebook={false}
                />
                <p className="cursor-pointer text-xs underline">
                  Edit Title/Cover{" "}
                </p>
                <Button className="text-xs md:text-sm">Continue Writing</Button>
              </div>
            </CarouselItem>

            <CarouselItem className="flex w-20 justify-center py-4">
              <div className="flex flex-col items-center gap-6 lg:gap-8">
                <p className="text-center text-sm font-semibold">
                  {"My 2024 meditation journal"}
                </p>
                <Book
                  title="My 2024 meditation journal"
                  color="bg-red-300"
                  label={false}
                  text={"text-black"}
                  notebook={false}
                />
                <p className="cursor-pointer text-xs underline">
                  Edit Title/Cover{" "}
                </p>
                <Button className="text-xs md:text-sm">Continue Writing</Button>
              </div>
            </CarouselItem>
            <CarouselItem className="flex w-20 justify-center py-4">
              <div className="flex flex-col items-center gap-6">
                <p className="text-center text-sm font-semibold">
                  {"My 2024 meditation journal"}
                </p>
                <Book
                  title="My 2024 meditation journal"
                  color="bg-red-300"
                  label={false}
                  text={"text-black"}
                  notebook={false}
                />
                <p className="cursor-pointer text-xs underline">
                  Edit Title/Cover{" "}
                </p>
                <Button className="text-xs md:text-sm">Continue Writing</Button>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
      </div>
    </main>
  );
}
