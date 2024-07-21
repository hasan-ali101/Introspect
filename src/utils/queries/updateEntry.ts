import { debounce } from "lodash";

export const updateEntry = async (entryId: string, content: string) => {
  const currentDate = new Date();

  try {
    const res = await fetch(`/api/entry/${entryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, currentDate }),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error adding to favourites:", error);
  }
};
export const debouncedUpdateEntry = debounce(updateEntry, 500);
