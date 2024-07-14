import { formatDate } from "../formatDate";
import { debounce } from "lodash";

export const updateEntry = (entryId: string, content: string) => {
  const currentDate = new Date();
  const updatedDate = formatDate(currentDate);

  fetch(`/api/entry/${entryId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, updatedDate }),
  });
};

export const debouncedUpdateEntry = debounce(updateEntry, 500);
