import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Entry } from "@/types/entry";

type SidebarEntryProps = {
  entry: Entry;
  className?: string;
};

const SidebarEntry = ({ entry, className }: SidebarEntryProps) => {
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
          size={16}
          className={cn(
            entry.favourite && " border-none fill-yellow-400",
            "shrink-0",
          )}
        />
        <p className="truncate text-sm font-semibold">
          {"This is the first line of an entry"}
        </p>
      </div>
      <div className="flex gap-2">
        <p className="text-xs">{entry.createdAt}</p>
        <p className="truncate text-xs text-gray-200">
          {"This is the second line of an entry"}
        </p>
      </div>
    </div>
  );
};

export default SidebarEntry;
