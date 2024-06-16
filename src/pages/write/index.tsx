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
import Link from "next/link";
import BackgroundImage from "@/components/background-image";
import { Montserrat } from "next/font/google";
import { getAuth, buildClerkProps } from "@clerk/nextjs/server";
import { GetServerSideProps } from "next";

const montserrat = Montserrat({ subsets: ["latin"] });

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
  const [isEditing, setIsEditing] = useState(false);
  const [books, setBooks] = useState<IBook[]>([]);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>(
    undefined,
  );
  const { userId } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(userId as string),
    staleTime: Infinity,
  });

  console.log("data:", data);
  console.log("loding: ", isLoading);

  useEffect(() => {
    if (data) {
      setBooks(data);
    }
  }, [data]); // this shouldn't be necessary. data should be set in the state initially

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
        pin: 1234,
      },
    ]);
    setIsEditing(true);
    carouselApi?.scrollTo(books.length);
  };

  const saveChanges = (book: IBook) => {
    console.log("saving changes");
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
      className={cn(
        `relative flex min-h-full flex-col items-center bg-gradient-to-t from-[white] to-[#a7bdea] px-10 text-white dark:from-dark-secondary dark:to-dark-primary xl:min-h-screen 2xl:py-10 ${montserrat.className}`,
      )}
    >
      <BackgroundImage />
      <div className="-mt-6 flex w-full flex-col gap-1 py-4 text-center md:mt-6">
        <h1 className="text-xl font-semibold">Your Library</h1>
        <p className=" dark:text-indigo-200">
          Write your thoughts, ideas, and stories here.
        </p>
      </div>
      <SignedIn>
        <div className="flex flex-col items-center ">
          {isError && (
            <p className="my-4 font-semibold">Error getting your books!</p>
          )}
          <Carousel setApi={setCarouselApi} drag={!isEditing}>
            <CarouselContent isEditing={isEditing}>
              {books &&
                books.map((book) => (
                  <CarouselItem key={book.id}>
                    <div
                      className={cn(
                        isEditing ? "-my-2 gap-10 p-4" : "my-2 gap-0",
                        "flex flex-col items-center justify-center md:flex-row",
                      )}
                    >
                      <div
                        className={cn(
                          !isEditing &&
                            "cursor-pointer transition-transform hover:scale-105",
                          "flex flex-col gap-8",
                        )}
                      >
                        <Link
                          className={cn(isEditing && "pointer-events-none")}
                          href={`/write/${book.id}`}
                        >
                          <div
                            className={cn(
                              !isEditing && "py-2 md:min-w-80",
                              " relative mx-4 flex min-w-56 flex-col items-center gap-6 rounded-3xl border bg-[#AECAF7] px-4 py-10  shadow-lg dark:bg-dark-tertiary md:mx-0",
                            )}
                          >
                            {!isEditing && (
                              <Pencil
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsEditing(true);
                                }}
                                className="absolute right-3 top-3 z-10 rounded-md border bg-[#AECAF7] p-1 opacity-50 hover:bg-white/30 dark:bg-dark-tertiary dark:hover:bg-dark-tertiary/90 md:right-4 md:top-4 md:h-8 md:w-8"
                              />
                            )}

                            {isEditing && (
                              <div className="relative mx-4 ">
                                <Pencil className="absolute right-1 top-[6px] h-3 w-3" />
                                <input
                                  maxLength={50}
                                  type="text"
                                  placeholder="Book Title"
                                  className="text-md w-full border-b-2 border-gray-300 bg-transparent pl-2 pr-6  outline-slate-100"
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
                              pin={book.pin}
                            />
                            {!isEditing && (
                              <div className="flex w-full justify-center border-y-[0.5px] dark:border-gray-200">
                                <p className="line-clamp-2 max-w-40 px-4 py-[7px] text-center text-sm font-semibold md:max-w-64 md:text-lg">
                                  {book.title}
                                </p>
                              </div>
                            )}
                          </div>
                        </Link>
                        {isEditing && (
                          <div className="-mt-4 flex flex-col items-center justify-center gap-4">
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
                          "relative overflow-hidden rounded-xl border-2 bg-[#AECAF7] shadow-lg transition-all duration-500 dark:bg-dark-tertiary md:h-full",
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
                            setBooks(data!);
                            carouselApi?.scrollTo(
                              carouselApi?.slidesInView()[0],
                            );
                          }}
                        />
                        {isEditing && (
                          <div className="flex h-full min-h-64 w-full flex-col gap-8 px-8 pb-4 pt-10">
                            <RadioGroup
                              onValueChange={(e) =>
                                notebookSelectHandler(book.id, e)
                              }
                              className="grid-flow-col"
                              defaultValue={book.notebook ? "notebook" : "book"}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="book"
                                  id="book"
                                  className="border-white text-white"
                                />
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
                                  className="border-white text-white"
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
                                    book.color === color && "bg-white",
                                    "flex h-10 w-10 items-center justify-center rounded-full border",
                                  )}
                                >
                                  <div
                                    className={cn(
                                      "h-8 w-8 cursor-pointer rounded-full hover:scale-105 ",
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
                                <RadioGroupItem
                                  value="label"
                                  id="label"
                                  className="border-white text-white"
                                />
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
                                  className="border-white text-white"
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
                                    book.coverImage === image && "bg-white",
                                    "h-10 w-10 cursor-pointer rounded-md border p-[2px] hover:scale-105",
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
                                  className="ut-button:shadown-md ut-button:border-zinc-500 ut-button:bg-zinc-100 ut-button:p-4 ut-button:text-sm ut-button:text-black hover:ut-button:bg-zinc-100/80 ut-allowed-content:text-[8px] ut-button:dark:border dark:ut-button:border-white ut-button:dark:bg-transparent ut-button:dark:text-white ut-button:hover:dark:bg-dark-secondary dark:ut-allowed-content:text-gray-300"
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
              <CarouselNext className="bg-[#AECAF7] transition-transform hover:scale-105 hover:bg-[#79A9F5] hover:text-white dark:border-white dark:bg-dark-tertiary dark:hover:scale-105 hover:dark:bg-dark-tertiary/90" />
            )}
            {!isEditing && (
              <CarouselPrevious className="bg-[#AECAF7] transition-transform hover:scale-105 hover:bg-[#79A9F5] hover:text-white dark:border-white dark:bg-dark-tertiary dark:hover:scale-105 hover:dark:bg-dark-tertiary/90" />
            )}
          </Carousel>
          {!isEditing && books.length > 0 && (
            <div className="z-10 mt-2 flex items-center justify-center gap-2">
              <Button
                variant={"secondary"}
                className="border bg-[#AECAF7] text-white  transition-transform hover:bg-[#AECAF7]/90 dark:border-white dark:bg-dark-tertiary hover:dark:scale-105 hover:dark:bg-transparent"
                onClick={addBookHandler}
              >
                + Add a new book
              </Button>
            </div>
          )}
        </div>
      </SignedIn>
      <SignedOut>
        <div className="z-10 mt-12 flex h-full items-center justify-center underline">
          <SignInButton />
        </div>
      </SignedOut>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);
  const queryClient = new QueryClient();
  const clerkProps = await buildClerkProps(ctx.req);

  if (!userId) {
    console.log("User not authenticated");
  } else {
    await queryClient.prefetchQuery({
      queryKey: ["books"],
      queryFn: () => getBooks(userId),
      staleTime: Infinity,
    });
  }

  return {
    props: {
      ...clerkProps,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
