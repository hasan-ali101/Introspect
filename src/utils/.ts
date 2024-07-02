import { IBook } from "@/types/book";
import db from "@/db/drizzle";
import { books } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useQuery } from "@tanstack/react-query";

const getBooks = async (userId: string): Promise<IBook[] | undefined> => {
  if (typeof window == "undefined") {
    console.log("Application is on server side");
    try {
      const data =
        (await db.select().from(books).where(eq(books.userId, userId))) || [];
      return data as IBook[];
    } catch (error) {
      console.error("Database fetch error:", error);
      return [];
    }
  } else {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/books`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = (await response.json()) as IBook[];
      return data || [];
    } catch (error) {
      console.error("Fetch error:", error);
      return []; // Return an empty array in case of error
    }
  }
};

export const useBooksQuery = (userId: string) => {
  return useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(userId as string),
    staleTime: Infinity,
  });
};

export default getBooks;
