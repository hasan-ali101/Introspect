import type { IBook } from "@/types/book";

export const updateBook = async (book: IBook) => {
  try {
    const response = await fetch(`/api/books/${book.id}`, {
      method: "PUT",
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

export default updateBook;
