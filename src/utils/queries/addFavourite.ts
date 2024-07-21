export const addFavourite = async (entryId: string, favourite: boolean) => {
  try {
    const response = await fetch(`/api/entry/favourite/${entryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favourite }),
    });
    if (!response.ok) {
      throw new Error("Network error");
    }
  } catch (error) {
    console.error("Error adding to favourites:", error);
  }
};
