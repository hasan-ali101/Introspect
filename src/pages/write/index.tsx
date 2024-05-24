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
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

const dummyBooks = [
  {
    title: "My 2024 meditation journal",
    color: "bg-red-300",
    label: false,
    text: "text-black",
    notebook: false,
  },
  {
    title: "Coding Notes - Next.js",
    color: "bg-green-300",
    label: false,
    text: "text-black",
    notebook: true,
  },
  {
    title: "the bongo book",
    color: "bg-blue-300",
    label: true,
    text: "text-black",
    notebook: false,
  },
];

export default function Write() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-10 ${inter.className}`}
    >
      <div id="books" className="flex scroll-mt-96 items-start p-6">
        <Carousel drag={!isEditing}>
          <CarouselContent>
            {dummyBooks.map((book) => (
              <CarouselItem
                className={cn(
                  isEditing ? "w-24" : "w-20",
                  "flex justify-center py-4 sm:w-32 md:w-40",
                )}
              >
                <div className="flex flex-col gap-10 md:flex-row">
                  <div className="flex flex-col items-center gap-6">
                    <p className="text-center text-sm font-semibold md:text-xl">
                      {book.title}
                    </p>
                    <Book
                      title={book.title}
                      color={book.color}
                      label={book.label}
                      text={book.text}
                      notebook={book.notebook}
                    />
                    {!isEditing && (
                      <>
                        <p
                          className="cursor-pointer text-xs underline"
                          onClick={() => {
                            setIsEditing(true);
                          }}
                        >
                          Edit Title/Cover
                        </p>
                        <Button className="text-xs md:text-sm">
                          Continue Writing
                        </Button>
                      </>
                    )}
                  </div>

                  <div
                    id="editor"
                    className={cn(
                      isEditing
                        ? "h-64 border md:w-64"
                        : "h-0 border-none md:w-0",
                      "relative w-64 scroll-my-96 border transition-all duration-500 ease-out md:h-64",
                    )}
                  >
                    <CircleX
                      className={cn(
                        !isEditing ? "hidden" : "flex",
                        "absolute right-5 top-5 cursor-pointer",
                      )}
                      onClick={() => setIsEditing(false)}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
            <CarouselItem className="flex w-0 items-center justify-center py-4">
              <div className="flex flex-col items-center gap-6">
                <p className="text-center text-sm font-semibold">
                  {"Add a new book?"}
                </p>
                <div className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-xl bg-gray-100 pb-2 text-7xl text-gray-600 transition-transform hover:scale-105">
                  +
                </div>
                <Button className="text-xs md:text-sm">Add book</Button>
              </div>
            </CarouselItem>
          </CarouselContent>
          {!isEditing && <CarouselNext />}
          {!isEditing && <CarouselPrevious />}
        </Carousel>
      </div>
    </main>
  );
}
