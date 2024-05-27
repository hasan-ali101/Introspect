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
import { CircleOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { IBook } from "@/types/book";
import Image from "next/image";
import { UploadButton } from "@/lib/utils";
import { Pencil } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

const dummyBooks: IBook[] = [
  {
    id: "1",
    title: "My 2024 meditation journal",
    color: "bg-red-300",
    label: false,
    text: "text-black",
    notebook: false,
    coverImage: "/stars.jpeg",
    imageFit: "object-fill",
    uploadedImage: "",
  },
  {
    id: "2",
    title: "Coding Notes - Next.js",
    color: "bg-green-300",
    label: false,
    text: "text-black",
    notebook: true,
    coverImage: "/venus.jpeg",
    imageFit: "object-cover",
    uploadedImage: "",
  },
  {
    id: "3",
    title: "the bongo book",
    color: "bg-blue-300",
    label: true,
    text: "text-black",
    notebook: false,
    coverImage: "/wave.jpeg",
    imageFit: "object-fill",
    uploadedImage: "",
  },
  {
    id: "4",
    title: "the 4th book",
    color: "bg-blue-300",
    label: true,
    text: "text-black",
    notebook: false,
    coverImage: "/flowers.webp",
    imageFit: "object-fill",
    uploadedImage: "",
  },
];

const defaultColors = [
  "bg-red-300",
  "bg-blue-300",
  "bg-green-300",
  "bg-pink-300",
  "bg-purple-300",
];

const defaultImages = [
  "/wave.jpeg",
  "/stars.jpeg",
  "/venus.jpeg",
  "/flowers.webp",
];

export default function Write() {
  const [isEditing, setIsEditing] = useState(false);
  const [books, setBooks] = useState(dummyBooks);
  const [selectedBook, setSelectedBook] = useState<IBook | undefined>(
    undefined,
  );
  // const [uploadedImage, setUploadedImage] = useState<string>("");

  const onSelectColor = (id: string, color: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === id ? { ...book, color } : book)),
    );
  };

  const onSelectNotebook = (e: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === selectedBook?.id
          ? { ...book, notebook: e === "notebook" }
          : book,
      ),
    );
  };

  const onSelectLabel = (e: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === selectedBook?.id ? { ...book, label: e === "label" } : book,
      ),
    );
  };

  const onSelectImage = (id: string, image: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, coverImage: image } : book,
      ),
    );
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-10 ${inter.className}`}
    >
      <div id="books" className="flex scroll-mt-96 items-start p-6">
        <Carousel drag={!isEditing}>
          <CarouselContent>
            {books.map((book) => (
              <CarouselItem
                key={book.id}
                className={cn(
                  isEditing ? "w-24" : "w-20",
                  "flex justify-center py-4 sm:w-32 md:w-40",
                )}
              >
                <div
                  className={cn(
                    isEditing && "gap-10",
                    "flex flex-col items-center justify-center md:flex-row",
                  )}
                >
                  <div
                    className={cn(
                      !isEditing && "py-10 md:min-w-80",
                      " mx-4 flex min-w-56 flex-col items-center gap-6 rounded-3xl border px-4 py-8 shadow-sm md:mx-0",
                    )}
                  >
                    {!isEditing && (
                      <p className="px-4 text-center text-sm font-semibold md:text-lg">
                        {book.title}
                      </p>
                    )}
                    {isEditing && selectedBook?.id === book.id && (
                      <div className="relative mx-4">
                        <Pencil className="absolute right-1 top-[6px] h-3 w-3" />
                        <input
                          type="text"
                          className="text-md w-full border-b-2 border-gray-300 pl-2 pr-6 outline-slate-100 dark:border-gray-700"
                          value={book.title}
                          onChange={(e) =>
                            setBooks((prevBooks) =>
                              prevBooks.map((prevBook) =>
                                prevBook.id === book.id
                                  ? { ...prevBook, title: e.target.value }
                                  : prevBook,
                              ),
                            )
                          }
                        />
                      </div>
                    )}
                    <Book
                      id={book.id}
                      title={book.title}
                      color={book.color}
                      label={book.label}
                      text={book.text}
                      notebook={book.notebook}
                      editMode={isEditing && selectedBook?.id === book.id}
                      coverImage={book.coverImage}
                    />
                    {!isEditing && (
                      <>
                        <p
                          className="cursor-pointer text-xs underline"
                          onClick={() => {
                            setIsEditing(true);
                            setSelectedBook(book);
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
                      isEditing && selectedBook?.id === book.id
                        ? "h-full md:w-80"
                        : "h-0 border-transparent md:w-0",
                      "relative w-full scroll-my-96 overflow-hidden rounded-xl border-2 transition-all duration-300 ease-out md:h-full",
                    )}
                  >
                    <CircleX
                      size={20}
                      className={cn(
                        !isEditing ? "hidden" : "flex",
                        "absolute right-2 top-2 cursor-pointer",
                      )}
                      onClick={() => (
                        setIsEditing(false), setSelectedBook(undefined)
                      )}
                    />
                    {isEditing && selectedBook?.id === book.id && (
                      <div className="flex h-full min-h-64 w-full flex-col gap-8 px-8 py-8">
                        <RadioGroup
                          onValueChange={(e) => onSelectNotebook(e)}
                          className="grid-flow-col"
                          defaultValue={
                            selectedBook.notebook ? "notebook" : "book"
                          }
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="book" id="book" />
                            <Label
                              className="text-nowrap text-xs"
                              htmlFor="option-one"
                            >
                              Book
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="notebook" id="notebook" />
                            <Label
                              className="text-nowrap text-xs"
                              htmlFor="option-two"
                            >
                              Notebook
                            </Label>
                          </div>
                        </RadioGroup>
                        <div
                          className={cn(
                            !isEditing && "hidden",
                            "flex w-full justify-between",
                          )}
                        >
                          {defaultColors.map((color) => (
                            <div
                              key={color}
                              className={
                                "flex h-8 w-8 items-center justify-center rounded-full border"
                              }
                            >
                              <div
                                className={cn(
                                  book.color === color &&
                                    "bg-slate-200 dark:bg-white",
                                  "flex h-8 w-8 items-center justify-center rounded-full border",
                                )}
                              >
                                <div
                                  className={cn(
                                    "h-6 w-6 cursor-pointer rounded-full hover:scale-105",
                                    color,
                                  )}
                                  onClick={() => onSelectColor(book.id, color)}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        <RadioGroup
                          onValueChange={(e) => onSelectLabel(e)}
                          className="grid-flow-col"
                          defaultValue={
                            selectedBook.label ? "label" : "no label"
                          }
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="label" id="label" />
                            <Label
                              className="text-nowrap text-xs"
                              htmlFor="option-one"
                            >
                              Label
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no label" id="no label" />
                            <Label
                              className="text-nowrap text-xs"
                              htmlFor="option-two"
                            >
                              No Label
                            </Label>
                          </div>
                        </RadioGroup>
                        <div className="flex w-full justify-between">
                          <div
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border"
                            onClick={() => {
                              setBooks((prevBooks) =>
                                prevBooks.map((prevBook) =>
                                  prevBook.id === book.id
                                    ? { ...prevBook, coverImage: "" }
                                    : prevBook,
                                ),
                              );
                            }}
                          >
                            <CircleOff className=" h-4 w-4" />
                          </div>
                          {defaultImages.map((image) => (
                            <div
                              key={image}
                              className={cn(
                                book.coverImage === image && "bg-slate-300",
                                "h-8 w-8 cursor-pointer rounded-md border p-[1px] hover:scale-105",
                              )}
                              onClick={() => onSelectImage(book.id, image)}
                            >
                              <Image
                                className="h-full w-full rounded-md object-cover"
                                src={image}
                                width={100}
                                height={100}
                                alt={image}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex w-full items-start justify-between">
                          <UploadButton
                            className="ut-allowed-content:text-[8px] ut-button:bg-emerald-500 ut-button:text-sm ut-button:p-4"
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              // Do something with the response
                              console.log("Files: ", res);
                              setBooks((prevBooks) => {
                                return prevBooks.map((prevBook) =>
                                  prevBook.id === book.id
                                    ? { ...prevBook, uploadedImage: res[0].url }
                                    : prevBook,
                                );
                              });
                              alert("Upload Completed");
                            }}
                            onUploadError={(error: Error) => {
                              // Do something with the error.
                              alert(`ERROR! ${error.message}`);
                            }}
                          />
                          <div className="flex flex-col items-center justify-center gap-2">
                            <div
                              className="flex h-8 w-8 cursor-pointer items-center
                            justify-center rounded-md border"
                              onClick={() => {
                                book.uploadedImage &&
                                  onSelectImage(book.id, book.uploadedImage);
                              }}
                            >
                              {book.uploadedImage && (
                                <img
                                  src={book.uploadedImage}
                                  className="h-full w-full rounded-md"
                                />
                              )}
                            </div>
                            <p className="text-[8px]">Your image</p>
                          </div>
                        </div>
                      </div>
                    )}
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
