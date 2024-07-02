import { useCallback, useEffect, useState } from "react";
import {
  PanelLeftClose,
  PanelLeftOpen,
  CirclePlus,
  ArrowDownWideNarrow,
} from "lucide-react";
import { Reorder } from "framer-motion";

import { cn } from "@/lib/utils";
import SidebarEntry from "@/components/sidebar-entry";
import { Entry } from "@/types/entry";

type SidebarProps = {
  isOpen: Boolean;
  toggleSidebar: () => void;
  bookEntries?: Entry[];
  onEntrySelected: (entry: Entry) => void;
};

const Sidebar = ({
  isOpen,
  toggleSidebar,
  bookEntries,
  onEntrySelected,
}: SidebarProps) => {
  const [entries, setEntries] = useState(bookEntries);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.metaKey === true || event.ctrlKey === true) {
      if (event.key === "b") {
        event.preventDefault();
        toggleSidebar();
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div
      className={cn(
        isOpen
          ? "w-72 sm:w-48 sm:border-r sm:border-r-transparent sm:border-r-white md:w-64"
          : "w-12 border-r py-10 sm:w-16",
        "flex h-full rounded-l-3xl transition-all dark:bg-[#4e519e]",
      )}
    >
      {!isOpen ? (
        <div className="flex w-full flex-col items-center gap-6">
          <CirclePlus className="h-8 w-8  cursor-pointer rounded-md p-1 text-gray-200 hover:bg-white/20" />
          <PanelLeftOpen
            onClick={() => toggleSidebar()}
            className="h-8 w-8  cursor-pointer rounded-md p-1 text-gray-200 hover:bg-white/20"
          />
        </div>
      ) : (
        <div className="flex w-full flex-col">
          <div className="flex h-10 w-full items-center justify-between gap-6 border-b px-3 py-6">
            <div className="flex cursor-pointer items-center gap-1 rounded-md border-[0.5px] p-1 text-xs hover:bg-white/20">
              <CirclePlus className="text-gray-200" />
              <p>New entry</p>
            </div>
            <div className="flex items-center gap-1">
              <ArrowDownWideNarrow className="h-8 w-8  cursor-pointer rounded-md p-1 text-gray-200 hover:bg-white/20" />
              <PanelLeftClose
                onClick={() => toggleSidebar()}
                className="h-8 w-8  cursor-pointer rounded-md p-1 text-gray-200 hover:bg-white/20"
              />
            </div>
          </div>
          <div className="flex w-full flex-col overflow-auto">
            <Reorder.Group
              axis="y"
              values={entries || []}
              onReorder={setEntries}
            >
              {entries?.map((entry) => (
                <Reorder.Item
                  key={entry.id}
                  value={entry}
                  onClick={() => onEntrySelected(entry)}
                >
                  <SidebarEntry entry={entry} />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
