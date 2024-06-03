import axios from "axios";

const getBooks = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/books`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("Axios response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
  }
};

export default getBooks;
