import { useCallback, useEffect, useState } from "react";
import {
  PanelLeftClose,
  PanelLeftOpen,
  CirclePlus,
  ArrowDownWideNarrow,
} from "lucide-react";
import { Reorder } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import { cn } from "@/lib/utils";
import SidebarEntry from "@/components/sidebar-entry";
import { Entry } from "@/types/entry";
import { formatDate } from "@/utils/formatDate";
import addNewEntry from "@/utils/queries/addNewEntry";
import { updateEntryOrder } from "@/utils/queries/updateEntryOrder";

type SidebarProps = {
  isOpen: Boolean;
  toggleSidebar: () => void;
  bookEntries?: Entry[];
  onEntrySelected: (entry: Entry) => void;
  bookId: string;
  selectedEntryId?: string;
};

const Sidebar = ({
  isOpen,
  toggleSidebar,
  bookEntries,
  onEntrySelected,
  bookId,
  selectedEntryId,
}: SidebarProps) => {
  const [entries, setEntries] = useState(bookEntries);

  const queryClient = useQueryClient();

  const addEntryMutation = useMutation({
    mutationFn: (entry: Entry) => addNewEntry(entry),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["entries", bookId] });
    },
  });

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.metaKey === true || event.ctrlKey === true) {
        if (event.key === "b") {
          event.preventDefault();
          toggleSidebar();
        }
      }
    },
    [toggleSidebar],
  );

  useEffect(() => {
    const orderedEntries = bookEntries?.sort((a, b) => a.index - b.index) || [];
    setEntries(orderedEntries);
  }, [bookEntries]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const createNewEntry = () => {
    const newEntry = {
      id: uuidv4(),
      bookId: bookId,
      content: Math.random().toString(36).substring(7),
      createdAt: formatDate(new Date()),
      updatedAt: formatDate(new Date()),
      favourite: false,
      index: 0,
    };

    addEntryMutation.mutate(newEntry);

    onEntrySelected(newEntry);
  };

  return (
    <div
      className={cn(
        isOpen
          ? "w-72 rounded-r-3xl sm:w-48 sm:rounded-r-none sm:border-r sm:border-r-transparent sm:border-r-white md:w-64"
          : "w-12 border-r py-10 sm:w-16",
        "flex h-full overflow-clip rounded-l-3xl transition-all dark:bg-[#4e519e]",
      )}
    >
      {!isOpen ? (
        <div className="flex w-full flex-col items-center gap-6">
          <CirclePlus
            onClick={() => createNewEntry()}
            className="h-8 w-8 cursor-pointer rounded-md p-1 text-gray-200 hover:bg-white/20"
          />
          <PanelLeftOpen
            onClick={() => toggleSidebar()}
            className="h-8 w-8  cursor-pointer rounded-md p-1 text-gray-200 hover:bg-white/20"
          />
        </div>
      ) : (
        <div className="flex w-full flex-col">
          <div className="flex h-10 w-full items-center justify-between gap-6 border-b px-3 py-6">
            <div
              className="flex cursor-pointer items-center gap-1 rounded-md border-[0.5px] p-1 text-xs hover:bg-white/20"
              onClick={() => createNewEntry()}
            >
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
              onReorder={(newOrder) => {
                newOrder.forEach((entry, index) => {
                  entry.index = index;
                });
                updateEntryOrder(bookId, newOrder);
                setEntries(newOrder);
                console.log(newOrder); // update entries in the database
              }}
            >
              {entries?.map((entry) => (
                <Reorder.Item
                  key={entry.id}
                  value={entry}
                  onClick={() => {
                    onEntrySelected(entry);
                  }}
                >
                  <SidebarEntry
                    className={cn(
                      selectedEntryId === entry.id && "bg-white/20",
                    )}
                    entry={entry}
                  />
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
