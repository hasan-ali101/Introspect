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

type SidebarProps = { isOpen: Boolean; toggleSidebar: () => void };

const dummyEntries = [
  {
    id: 1,
    bookId: 1,
    firstLine: "Ideas for Introspect…",
    secondLine:
      "So the fetch request returns the data when used from the client, but it returns undefined / the response is not ok.",
    createdAt: new Date(),
    updatedAt: new Date(),
    favourite: false,
  },
  {
    id: 2,
    bookId: 1,
    firstLine: "This is the second entry",
    secondLine:
      "This is the second line but this time it's quite  lot longer than the first one. I wonder how it will look like when it's truncated.",
    createdAt: new Date(),
    updatedAt: new Date(),
    favourite: true,
  },
  {
    id: 3,
    bookId: 1,
    firstLine: "This is the third entry and it's quite long",
    secondLine: "This is the second line",
    createdAt: new Date(),
    updatedAt: new Date(),
    favourite: false,
  },
];

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const [entries, setEntries] = useState(dummyEntries);

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
        "flex h-full rounded-l-3xl transition-all dark:bg-dark-tertiary",
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
            <Reorder.Group axis="y" values={entries} onReorder={setEntries}>
              {entries.map((entry) => (
                <Reorder.Item key={entry.id} value={entry}>
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
