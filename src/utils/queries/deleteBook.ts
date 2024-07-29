export const deleteBookRequest = async (bookId: string) => {
  try {
    const response = await fetch(`/api/books/${bookId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Database insert error:", error);
    return { error: "Internal Server Error" };
  }
};
