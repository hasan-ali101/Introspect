import { Inter } from "next/font/google";
import Book from "@/components/book";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
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
import { useToast } from "@/components/ui/use-toast";

const inter = Inter({ subsets: ["latin"] });

const dummyBooks: IBook[] = [
  {
    id: 1,
    title: "My 2024 meditation journal",
    color: "bg-red-300",
    label: false,
    notebook: false,
    coverImage: "/flowers.webp",
    uploadedImage: "",
  },
  {
    id: 2,
    title: "Coding Notes - Next.js",
    color: "bg-purple-300",
    label: false,
    notebook: true,
    coverImage: "/venus.jpeg",
    uploadedImage: "",
  },
  {
    id: 3,
    title: "the bongo book",
    color: "bg-blue-300",
    label: true,
    notebook: false,
    coverImage: "/wave.jpeg",
    uploadedImage: "",
  },
  {
    id: 4,
    title: "the 4th book",
    color: "bg-blue-300",
    label: true,
    notebook: false,
    coverImage: "/spaces.jpeg",
    uploadedImage: "",
  },
];

const defaultColors = [
  "bg-red-300",
  "bg-blue-300",
  "bg-purple-300",
  "bg-emerald-300",
  "bg-orange-300",
];

const defaultImages = [
  "/wave.jpeg",
  "/spaces.jpeg",
  "/venus.jpeg",
  "/flowers.webp",
];

export default function Write() {
  const [isEditing, setIsEditing] = useState(false);
  const [books, setBooks] = useState(dummyBooks);
  const [selectedBook, setSelectedBook] = useState<IBook | undefined>(
    undefined,
  );
  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>(
    undefined,
  );

  console.log(selectedBook);

  const { toast } = useToast();

  const colorSelectHandler = (id: number, color: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === id ? { ...book, color } : book)),
    );
  };

  const notebookSelectHandler = (id: number, e: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, notebook: e === "notebook" } : book,
      ),
    );
  };

  const labelSelectHandler = (id: number, e: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, label: e === "label" } : book,
      ),
    );
  };

  const imageSelectHandler = (id: number, image: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, coverImage: image } : book,
      ),
    );
  };

  const addBookHandler = () => {
    setBooks((prevBooks) => [
      ...prevBooks,
      {
        id: prevBooks.length + 1, // Need to gen a unique id
        title: "New Book Title",
        color: "bg-red-300",
        label: true,
        text: "text-black",
        notebook: false,
        coverImage: "",
        uploadedImage: "",
      },
    ]);
    setSelectedBook(books[books.length - 1]);
    setIsEditing(true);
    carouselApi?.scrollTo(books.length);
  };

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center px-10 pb-10 ${inter.className}`}
    >
      <div className="my-6 flex w-full flex-col gap-1 py-4 text-center">
        <h1 className="text-xl font-semibold">Your Library</h1>
        <p className=" text-gray-500">
          Write your thoughts, ideas, and stories here.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <Carousel setApi={setCarouselApi} drag={!isEditing}>
          <CarouselContent>
            {books.map((book) => (
              <CarouselItem
                key={book.id}
                className={cn(
                  isEditing ? "w-24" : "w-20",
                  "flex justify-center pb-4 sm:w-32 md:w-40",
                )}
              >
                <div
                  className={cn(
                    isEditing ? "gap-10" : "gap-0",
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
                    {isEditing && (
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
                      isEditing
                        ? "h-full md:w-80"
                        : "h-0 border-transparent md:w-0",
                      "relative w-full overflow-hidden rounded-xl border-2 transition-all duration-300 ease-out md:h-full",
                    )}
                  >
                    <CircleX
                      size={28}
                      className={cn(
                        !isEditing ? "hidden" : "flex",
                        "absolute right-2 top-2 cursor-pointer",
                      )}
                      onClick={() => (
                        setIsEditing(false), setSelectedBook(undefined)
                      )}
                    />
                    {isEditing && (
                      <div className="flex h-full min-h-64 w-full flex-col gap-8 px-8 pb-4 pt-10">
                        <RadioGroup
                          onValueChange={(e) =>
                            notebookSelectHandler(book.id, e)
                          }
                          className="grid-flow-col"
                          defaultValue={
                            selectedBook?.notebook ? "notebook" : "book"
                          }
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="book" id="book" />
                            <Label className="text-nowrap" htmlFor="option-one">
                              Book
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="notebook" id="notebook" />
                            <Label className="text-nowrap" htmlFor="option-two">
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
                              className={cn(
                                book.color === color &&
                                  "bg-slate-200 dark:bg-white",
                                "flex h-10 w-10 items-center justify-center rounded-full border",
                              )}
                            >
                              <div
                                className={cn(
                                  "h-8 w-8 cursor-pointer rounded-full hover:scale-105",
                                  color,
                                )}
                                onClick={() =>
                                  colorSelectHandler(book.id, color)
                                }
                              />
                            </div>
                          ))}
                        </div>
                        <RadioGroup
                          onValueChange={(e) => labelSelectHandler(book.id, e)}
                          className="grid-flow-col"
                          defaultValue={book.label ? "label" : "no label"}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="label" id="label" />
                            <Label className="text-nowrap" htmlFor="option-one">
                              Label
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no label" id="no label" />
                            <Label className="text-nowrap" htmlFor="option-two">
                              No Label
                            </Label>
                          </div>
                        </RadioGroup>
                        <div className="flex w-full justify-between">
                          <div
                            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border"
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
                                "h-10 w-10 cursor-pointer rounded-md border p-[1px] hover:scale-105",
                              )}
                              onClick={() => imageSelectHandler(book.id, image)}
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
                        <div className="flex flex-col gap-3">
                          <p className="text-sm">Upload a cover image:</p>

                          <div className="flex w-full items-start justify-between">
                            <UploadButton
                              className="ut-button:shadown-md ut-button:border ut-button:border-zinc-500 ut-button:bg-zinc-100 ut-button:p-4 ut-button:text-sm ut-button:text-black hover:ut-button:bg-zinc-100/80 ut-allowed-content:text-[8px] dark:ut-button:border-white ut-button:dark:bg-zinc-800 ut-button:dark:text-white ut-button:hover:dark:bg-zinc-800/80"
                              endpoint="imageUploader"
                              onClientUploadComplete={(res) => {
                                // Do something with the response
                                console.log("Files: ", res);
                                setBooks((prevBooks) => {
                                  return prevBooks.map((prevBook) =>
                                    prevBook.id === book.id
                                      ? {
                                          ...prevBook,
                                          uploadedImage: res[0].url,
                                        }
                                      : prevBook,
                                  );
                                });
                                toast({
                                  description: "Image Upload Successful",
                                });
                              }}
                              onUploadError={(error: Error) => {
                                // Do something with the error.
                                toast({
                                  description: "Image Upload Error",
                                });
                              }}
                            />
                            <div className="flex flex-col items-center justify-center gap-2">
                              <div
                                className={cn(
                                  book.coverImage === book.uploadedImage &&
                                    book.uploadedImage &&
                                    "bg-slate-300",
                                  "h-10 w-10 cursor-pointer rounded-md border-2 p-[1px] hover:scale-105",
                                )}
                                onClick={() => {
                                  book.uploadedImage &&
                                    imageSelectHandler(
                                      book.id,
                                      book.uploadedImage,
                                    );
                                }}
                              >
                                {book.uploadedImage && (
                                  <img
                                    src={book.uploadedImage}
                                    className="h-full w-full rounded-md"
                                  />
                                )}
                              </div>
                              {/* <p className="text-[8px] text-gray-600">
                              Your image
                            </p> */}
                            </div>
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
                <div
                  onClick={addBookHandler}
                  className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-xl bg-gray-100 pb-2 text-7xl text-gray-600 transition-transform hover:scale-105"
                >
                  +
                </div>
                <Button className="text-xs md:text-sm" onClick={addBookHandler}>
                  Add book
                </Button>
              </div>
            </CarouselItem>
          </CarouselContent>
          {!isEditing && <CarouselNext />}
          {!isEditing && <CarouselPrevious />}
        </Carousel>
        {isEditing && <Button>Save changes</Button>}
      </div>

      {!isEditing && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button variant={"secondary"} onClick={addBookHandler}>
            + Add a new book
          </Button>
        </div>
      )}
    </main>
  );
}
