import { useMutation } from "@tanstack/react-query";

export const deleteBookRequest = (bookId: string) =>
  fetch(`/api/books/${bookId}`, {
    method: "DELETE",
  });
