import { debounce } from "lodash";

export const updateEntry = (entryId: string, content: string) => {
  const currentDate = new Date();

  fetch(`/api/entry/${entryId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, currentDate }),
  });
};

export const debouncedUpdateEntry = debounce(updateEntry, 500);
