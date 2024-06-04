import type { IBook } from "@/types/book";

export const postBooks = async (book: IBook) => {
  try {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export default postBooks;
