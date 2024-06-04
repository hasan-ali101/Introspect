export const getBooks = async () => {
  try {
    const response = await fetch("/api/books");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export default getBooks;
