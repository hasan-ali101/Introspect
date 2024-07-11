import { Entry } from "@/types/entry";

export const updateEntryOrder = async (bookId: string, newOrder: Entry[]) => {
  try {
    const response = await fetch(`/api/entries/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newOrder }),
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
