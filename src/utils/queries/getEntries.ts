import db from "@/db/drizzle";
import { entries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Entry } from "@/types/entry";

const getEntries = async (bookId: string): Promise<Entry[] | undefined> => {
  if (typeof window == "undefined") {
    try {
      const data =
        (await db.select().from(entries).where(eq(entries.bookId, bookId))) ||
        [];
      return (data as Entry[]) || [];
    } catch (error) {
      console.error("Database fetch error:", error);
      return [];
    }
  } else {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/entries/${bookId}`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Fetch error:", error);
      return []; // Return an empty array in case of error
    }
  }
};

export default getEntries;
