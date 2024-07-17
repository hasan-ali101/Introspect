import * as cheerio from "cheerio";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Entry } from "@/types/entry";
import { formatDate } from "@/utils/formatDate";

type SidebarEntryProps = {
  entry: Entry;
  className?: string;
};

const SidebarEntry = ({ entry, className }: SidebarEntryProps) => {
  const $ = cheerio.load(entry.content || "");
  const text = $("p, pre, h1, h2, h3, h4, h5, h6, div, span, code");
  let lines: string[] = [];
  text.each((_, el) => {
    if ($(el).text().trim() === "") return;
    lines.push($(el).text());
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
            console.log("clicked");
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
