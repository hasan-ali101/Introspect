import Book from "@/components/book";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { IBook } from "@/types/book";
import { Pencil } from "lucide-react";
import {
  dehydrate,
  QueryClient,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import getBooks, { useBooksQuery } from "@/utils/queries/getBooks";
import { useAuth } from "@clerk/nextjs";
import addNewBook from "@/utils/queries/addNewBook";
import { updateBook } from "@/utils/queries/updateBook";
import { v4 as uuidv4 } from "uuid";
import { SignedIn, SignInButton, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { getAuth, buildClerkProps } from "@clerk/nextjs/server";
import { GetServerSideProps } from "next";
import BookEditor from "@/components/book-editor";
import { Montserrat } from "next/font/google";
import Loader from "@/components/loader";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function Write() {
  const queryClient = useQueryClient();

  const { userId } = useAuth();

  const { data, isError } = useBooksQuery(userId!);

  const [books, setBooks] = useState<IBook[]>(data || []);
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | undefined>(
    undefined,
  );
  const [pageLoading, setPageLoading] = useState(false);

  const addBookMutation = useMutation({
    mutationFn: (book: IBook) => addNewBook(book),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
  const updateBookMutation = useMutation({
    mutationFn: (book: IBook) => updateBook(book),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const editorCloseHandler = (book: IBook) => {
    const originalBook = data?.find((b) => b.id === book.id);

    if (JSON.stringify(originalBook) !== JSON.stringify(book)) {
      setDialogOpen(true);
    } else {
      setIsEditing(false);
    }
  };

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

  const imageSelectHandler = (id: string, image: string | undefined) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, coverImage: image } : book,
      ),
    );
  };

  const imageUploadHandler = (res: any, id: string) => {
    setBooks((prevBooks) => {
      return prevBooks.map((prevBook) =>
        prevBook.id === id
          ? {
              ...prevBook,
              uploadedImage: res[0].url,
            }
          : prevBook,
      );
    });
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
    if (book.id.startsWith("book")) {
      updateBookMutation.mutate(book);
    } else {
      addBookMutation.mutate(book);
    }
    isEditing && setIsEditing(false);
  };

  const discardChanges = () => {
    setBooks(data!);
    setDialogOpen(false);
    setIsEditing(false);
  };

  const UnsavedChangesDialog = () => {
    return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className={cn(
            montserrat.className,
            "mx-auto max-w-md rounded-lg border bg-gradient-to-t from-white to-light-primary p-6 opacity-60 backdrop-blur-2xl dark:border-white dark:from-dark-secondary dark:to-dark-primary dark:opacity-80",
          )}
        >
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-slate-800 dark:text-slate-300">
            You have unsaved changes. Are you sure you want to discard them?
          </DialogDescription>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button onClick={discardChanges}>Discard Changes</Button>
            <Button
              variant="secondary"
              className="border bg-white text-black dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus-visible:ring-gray-700"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      {pageLoading ? (
        <Loader />
      ) : (
        <div>
          <UnsavedChangesDialog />
          <div className="-mt-6 flex w-full flex-col gap-1 py-4 text-center">
            <h1 className="text-xl font-semibold">Your Library</h1>
            <p className=" dark:text-indigo-200">
              Write your thoughts, ideas, and stories here.
            </p>
          </div>
          <SignedIn>
            <div className="flex flex-col items-center ">
              {isError && (
                <p className="my-6 font-semibold">
                  Error getting your books - try reloading!
                </p>
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
                                "w-64 cursor-pointer transition-transform hover:scale-105 sm:w-80",
                              "relative flex flex-col gap-8",
                            )}
                          >
                            {!isEditing && (
                              <Pencil
                                onClick={() => {
                                  setIsEditing(true);
                                }}
                                className="absolute right-6 top-3 z-20 rounded-md border bg-light-secondary p-1 opacity-50 transition-all hover:bg-white/30 dark:bg-dark-tertiary dark:hover:bg-white/30 md:right-4 md:top-4 md:h-8 md:w-8"
                              />
                            )}
                            <Link
                              onClick={(e) => {
                                isEditing && e.preventDefault();
                                !isEditing && setPageLoading(true);
                              }}
                              href={`/write/${book.id}`}
                            >
                              <div
                                className={cn(
                                  !isEditing && "md:min-w-80 py-2",
                                  " min-w-56 relative mx-4 flex flex-col items-center gap-6 rounded-3xl border bg-light-secondary px-4 py-10  shadow-lg dark:bg-dark-tertiary md:mx-0",
                                )}
                              >
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
                                  <div className="flex w-full justify-center border-y-[0.5px] border-white dark:border-gray-200">
                                    <p className="max-w-40 md:max-w-64 line-clamp-2 px-4 py-[7px] text-center text-sm font-semibold md:text-lg">
                                      {book.title}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </Link>

                            {isEditing && (
                              <div className="-mt-4 flex flex-col items-center justify-center gap-4">
                                <Button
                                  className="w-40 border border-slate-300 bg-slate-50 text-slate-900 ring-offset-slate-950 hover:bg-slate-50/90 focus-visible:ring-slate-300"
                                  onClick={() => {
                                    saveChanges(book);
                                  }}
                                >
                                  Save
                                </Button>
                              </div>
                            )}
                          </div>
                          <BookEditor
                            isEditing={isEditing}
                            onClose={editorCloseHandler}
                            onNotebookSelect={notebookSelectHandler}
                            onColorSelect={colorSelectHandler}
                            onLabelSelect={labelSelectHandler}
                            onImageSelect={imageSelectHandler}
                            onImageUploaded={imageUploadHandler}
                            book={book}
                          />
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
                    </div>
                  </CarouselItem>
                </CarouselContent>
                {!isEditing && (
                  <CarouselNext className="bg-light-secondary/90 transition-transform hover:scale-105 hover:bg-light-secondary/90 hover:text-white dark:border-white dark:bg-dark-tertiary dark:hover:scale-105 hover:dark:bg-dark-tertiary/90" />
                )}
                {!isEditing && (
                  <CarouselPrevious className="bg-light-secondary/90 transition-transform hover:scale-105 hover:bg-light-secondary/90 hover:text-white dark:border-white dark:bg-dark-tertiary dark:hover:scale-105 hover:dark:bg-dark-tertiary/90" />
                )}
              </Carousel>
              {!isEditing && books.length > 0 && (
                <div className="z-10 mt-6 flex items-center justify-center gap-2">
                  <Button
                    variant={"secondary"}
                    className="border bg-light-secondary/80 text-white  transition-transform hover:bg-light-secondary/90 dark:border-white dark:bg-dark-tertiary hover:dark:scale-105 hover:dark:bg-transparent"
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
        </div>
      )}
    </>
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
