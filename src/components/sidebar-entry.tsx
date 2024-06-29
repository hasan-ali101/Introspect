import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Entry } from "@/types/entry";

type SidebarEntryProps = {
  entry: Entry;
};

const SidebarEntry = ({ entry }: SidebarEntryProps) => {
  return (
    <div
      key={entry.id}
      className="mx-3 flex cursor-pointer flex-col gap-3 border-b border-gray-300 px-2 py-6 backdrop-blur-md hover:bg-white/10"
    >
      <div className="flex items-center gap-2">
        <Star
          size={16}
          className={cn(
            entry.favourite && " border-none fill-yellow-400",
            "shrink-0",
          )}
        />
        <p className=" truncate text-sm font-semibold">{entry.firstLine}</p>
      </div>
      <div className="flex gap-2">
        <p className="text-xs">{entry.createdAt.toLocaleDateString()}</p>
        <p className="truncate text-xs text-gray-200">{entry.secondLine}</p>
      </div>
    </div>
  );
};

export default SidebarEntry;
