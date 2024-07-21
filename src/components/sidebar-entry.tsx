import * as cheerio from "cheerio";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Entry } from "@/types/entry";
import { formatDate } from "@/utils/formatDate";
import { addFavourite } from "@/utils/queries/addFavourite";
import { useQueryClient, useMutation } from "@tanstack/react-query";

type SidebarEntryProps = {
  entry: Entry;
  className?: string;
};

const SidebarEntry = ({ entry, className }: SidebarEntryProps) => {
  const queryClient = useQueryClient();
  const $ = cheerio.load(entry.content || "");
  const text = $("p, pre, h1, h2, h3, h4, h5, h6, div, span, code");
  let lines: string[] = [];
  text.each((_, el) => {
    if ($(el).text().trim() === "") return;
    lines.push($(el).text());
  });

  //optimistic update

  const mutation = useMutation({
    mutationFn: () => {
      console.log("post");
      return addFavourite(entry.id, !entry.favourite);
    },

    onMutate: async () => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["entries", entry.bookId] });
      // Snapshot the previous value
      const previousEntries = queryClient.getQueryData([
        "entries",
        entry.bookId,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(["entries", entry.bookId], (old: Entry[]) => {
        return old.map((e) =>
          e.id === entry.id ? { ...e, favourite: !entry.favourite } : e,
        );
      });
      // Return a context object with the snapshotted value
      return { previousEntries };
    },
    onError: (context: any) => {
      queryClient.setQueryData(
        ["entries", entry.bookId],
        context.previousEntries,
      );
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["entries", entry.bookId],
      });
    },
  });

  return (
    <div
      key={entry.id}
      className={cn(
        className,
        "mx-3 flex cursor-pointer flex-col gap-3 border-b border-gray-300 px-2 py-6 backdrop-blur-md hover:bg-white/10",
      )}
    >
      <div className="flex items-center gap-2">
        <Star
          onClick={(e) => {
            e.stopPropagation();
            mutation.mutate();
          }}
          size={16}
          className={cn(
            entry.favourite && "border-none fill-yellow-400",
            "shrink-0 hover:scale-125",
          )}
        />
        <p className="truncate text-sm font-semibold">
          {lines[0] || "New Entry"}
        </p>
      </div>
      <div className="flex gap-2">
        <p className="text-xs">
          {formatDate(new Date(entry.createdAt as string))}
        </p>
        <p className="truncate text-xs text-gray-200">{lines[1]}</p>
      </div>
    </div>
  );
};

export default SidebarEntry;
