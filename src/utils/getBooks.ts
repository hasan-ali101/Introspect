import { IBook } from "@/types/book";

export const getBooks = async (): Promise<IBook[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/books`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = (await response.json()) as IBook[];
    return data || []; // Ensure an array is returned
  } catch (error) {
    console.error("Fetch error:", error);
    //return []; // Return an empty array in case of error
  }
};

export default getBooks;
