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
import {
  dehydrate,
  QueryClient,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import getBooks from "@/utils/getBooks";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { addNewBook } from "@/utils/addNewBook";
import { updateBook } from "@/utils/updateBook";
import { v4 as uuidv4 } from "uuid";
import { SignedIn, SignInButton, SignedOut } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

const defaultColors = [
  "bg-red-300",
  "bg-blue-300",
  "bg-purple-300",
  "bg-green-300",
  "bg-orange-300",
];

const defaultImages = [
  "/wave.jpeg",
  "/stars.jpeg",
  "/venus.jpeg",
  "/flowers.webp",
];

export default function Write() {
  const queryClient = useQueryClient();
  const { data, isError } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [books, setBooks] = useState<IBook[]>([]);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>(
    undefined,
  );
  const { userId } = useAuth();

  useEffect(() => {
    console.log("data", data);
    if (data) {
      setBooks(data);
    }
  }, [data]);

  const { toast } = useToast();

  const colorSelectHandler = (id: string, color: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === id ? { ...book, color } : book)),
    );
  };

  const notebookSelectHandler = (id: string, e: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, notebook: e === "notebook" } : book,
      ),
    );
  };

  const labelSelectHandler = (id: string, e: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, label: e === "label" } : book,
      ),
    );
  };

  const imageSelectHandler = (id: string, image: string) => {
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
        id: uuidv4(),
        userId: userId!,
        title: "New Book Title",
        color: "bg-purple-300",
        label: true,
        notebook: false,
        coverImage: "",
        uploadedImage: "",
      },
    ]);
    setIsEditing(true);
    carouselApi?.scrollTo(books.length);
  };

  const saveChanges = (book: IBook) => {
    if (book.id.startsWith("book")) {
      console.log("updating existing book");
      updateBook(book, book.id);
    } else {
      addNewBook(book);
    }
    isEditing && setIsEditing(false);
  };

  return (
    <main
      className={` relative flex min-h-screen flex-col items-center bg-gradient-to-t px-10 py-10 dark:from-[#7e80e7] dark:to-dark-primary ${inter.className}`}
    >
      <div
        className="absolute z-0 -mt-12 hidden h-full w-full opacity-40 transition-opacity dark:flex sm:-m-10 md:animate-stars"
        style={{
          backgroundImage: `url("/stars2.png")`,
          backgroundSize: "cover",
        }}
      >
        <div className="h-1 w-1 animate-shooting-star rounded-full bg-white md:animate-shooting-star-slow"></div>
        <div className="h-1 w-1 animate-shooting-star-2 rounded-full bg-white"></div>
      </div>

      <div className="mt-6 flex w-full flex-col gap-1 py-4 text-center">
        <h1 className="text-xl font-semibold">Your Library</h1>
        <p className=" text-gray-500 dark:text-indigo-200">
          Write your thoughts, ideas, and stories here.
        </p>
      </div>
      <SignedIn>
        <div className="flex flex-col items-center">
          {isError && <p>Error getting your books!</p>}
          {/* {books.length === 0 && !isError && <p>No books found!</p>} */}
          <Carousel setApi={setCarouselApi} drag={!isEditing}>
            <CarouselContent>
              {books &&
                books.map((book) => (
                  <CarouselItem key={book.id}>
                    <div
                      className={cn(
                        isEditing ? "gap-10 p-4" : "gap-0",
                        "flex flex-col items-center justify-center md:flex-row",
                      )}
                    >
                      <div className="flex flex-col gap-8">
                        <div
                          className={cn(
                            !isEditing && "py-10 md:min-w-80",
                            " mx-4 flex min-w-56 cursor-pointer flex-col items-center gap-6 rounded-3xl border px-4 py-8 shadow-sm  dark:bg-dark-tertiary md:mx-0",
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
                                placeholder="Book Title"
                                className="text-md w-full border-b-2 border-gray-300 pl-2 pr-6 outline-slate-100  dark:bg-transparent"
                                value={book.title}
                                onChange={(e) =>
                                  setBooks((prevBooks) =>
                                    prevBooks.map((prevBook) =>
                                      prevBook.id === book.id
                                        ? {
                                            ...prevBook,
                                            title: e.target.value,
                                          }
                                        : prevBook,
                                    ),
                                  )
                                }
                              />
                            </div>
                          )}
                          <Book
                            userId={book.userId}
                            id={book.id}
                            title={book.title}
                            color={book.color}
                            label={book.label}
                            notebook={book.notebook}
                            editMode={isEditing}
                            coverImage={book.coverImage}
                          />
                          {!isEditing && (
                            <>
                              <p
                                className="cursor-pointer text-sm  underline"
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
                        {isEditing && (
                          <div className="-mt-4 flex justify-center">
                            <Button
                              className="w-40"
                              onClick={() => {
                                saveChanges(book);
                              }}
                            >
                              Save
                            </Button>
                          </div>
                        )}
                      </div>
                      <div
                        id="editor"
                        className={cn(
                          isEditing
                            ? "h-full w-80 md:w-80"
                            : "w-0 border-transparent",
                          "relative overflow-hidden rounded-xl border-2 transition-all duration-300 ease-out dark:bg-dark-tertiary md:h-full",
                        )}
                      >
                        <CircleX
                          size={28}
                          className={cn(
                            !isEditing ? "hidden" : "flex",
                            "absolute right-2 top-2 cursor-pointer",
                          )}
                          onClick={() => {
                            setIsEditing(false),
                              queryClient.invalidateQueries({
                                queryKey: ["books"],
                              });
                            setBooks(data);
                            carouselApi?.scrollTo(
                              carouselApi?.slidesInView()[0],
                            );
                          }}
                        />
                        {isEditing && (
                          <div className="flex h-full min-h-64 w-full flex-col gap-6 px-8 pb-4 pt-10">
                            <RadioGroup
                              onValueChange={(e) =>
                                notebookSelectHandler(book.id, e)
                              }
                              className="grid-flow-col"
                              defaultValue={book.notebook ? "notebook" : "book"}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="book" id="book" />
                                <Label
                                  className="text-nowrap"
                                  htmlFor="option-one"
                                >
                                  Book
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="notebook"
                                  id="notebook"
                                />
                                <Label
                                  className="text-nowrap"
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
                              onValueChange={(e) =>
                                labelSelectHandler(book.id, e)
                              }
                              className="grid-flow-col"
                              defaultValue={book.label ? "label" : "no label"}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="label" id="label" />
                                <Label
                                  className="text-nowrap"
                                  htmlFor="option-one"
                                >
                                  Label
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="no label"
                                  id="no label"
                                />
                                <Label
                                  className="text-nowrap"
                                  htmlFor="option-two"
                                >
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
                                  onClick={() =>
                                    imageSelectHandler(book.id, image)
                                  }
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
                                  className="ut-button:shadown-md ut-button:border ut-button:border-zinc-500 ut-button:bg-zinc-100 ut-button:p-4 ut-button:text-sm ut-button:text-black hover:ut-button:bg-zinc-100/80 ut-allowed-content:text-[8px] dark:ut-button:border-white ut-button:dark:bg-transparent ut-button:dark:text-white ut-button:hover:dark:bg-dark-secondary dark:ut-allowed-content:text-gray-300"
                                  endpoint="imageUploader"
                                  onClientUploadComplete={(res) => {
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
                                        "bg-slate-300 hover:scale-105",
                                      "h-10 w-10 cursor-pointer rounded-md border-2 p-[1px]",
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
                  <Button
                    className="text-xs md:text-sm"
                    onClick={addBookHandler}
                  >
                    Add book
                  </Button>
                </div>
              </CarouselItem>
            </CarouselContent>
            {!isEditing && (
              <CarouselNext className="transition-transform dark:border-white dark:bg-dark-tertiary hover:dark:scale-105 hover:dark:bg-dark-tertiary/90" />
            )}
            {!isEditing && (
              <CarouselPrevious className="transition-transform dark:border-white dark:bg-dark-tertiary hover:dark:scale-105 hover:dark:bg-dark-tertiary/90" />
            )}
          </Carousel>
        </div>
        {!isEditing && books.length > 0 && (
          <div className="z-10 mt-4 flex items-center justify-center gap-2">
            <Button
              variant={"secondary"}
              className="border transition-transform dark:border-white dark:bg-transparent hover:dark:scale-105 hover:dark:bg-transparent"
              onClick={addBookHandler}
            >
              + Add a new book
            </Button>
          </div>
        )}
      </SignedIn>
      <SignedOut>
        <div className="z-10 mt-12 flex h-full items-center justify-center underline">
          <SignInButton />
        </div>
      </SignedOut>
    </main>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
