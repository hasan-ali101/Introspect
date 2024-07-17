import { debounce } from "lodash";

export const updateEntry = (entryId: string, favourite: boolean) => {
  fetch(`/api/entry/favourite/${entryId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ favourite }),
  });
};

export const debouncedUpdateEntry = debounce(updateEntry, 500);
