import { use, useCallback, useEffect, useState } from "react";
import {
  PanelLeftClose,
  PanelLeftOpen,
  CirclePlus,
  ArrowDownWideNarrow,
} from "lucide-react";
import { Reorder } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import SidebarEntry from "@/components/sidebar-entry";
import { Entry } from "@/types/entry";
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
  bookEntries = [],
  onEntrySelected,
  bookId,
  selectedEntryId,
}: SidebarProps) => {
  const [entries, setEntries] = useState(bookEntries);
  const [orderBy, setOrderBy] = useState("custom");

  const queryClient = useQueryClient();

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

  const sortByDate = (array: Entry[]): Entry[] => {
    function parseDate(dateString: string) {
      return new Date(dateString);
    }

    array?.sort((a, b) => {
      return (
        parseDate(b.createdAt!).getTime() - parseDate(a.createdAt!).getTime()
      );
    });

    return array;
  };

  const sortByFavourites = (array: Entry[]): Entry[] => {
    const favourites = sortByDate(
      array.filter((entry) => entry.favourite === true),
    );
    const nonFavourites = sortByDate(
      array.filter((entry) => entry.favourite === false),
    );

    return [...favourites, ...nonFavourites];
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const addEntryMutation = useMutation({
    mutationFn: (entry: Entry) => addNewEntry(entry),
    onMutate: async (newEntry: Entry) => {
      await queryClient.cancelQueries({ queryKey: ["entries", bookId] });

      const previousEntries = queryClient.getQueryData(["entries", bookId]);

      queryClient.setQueryData(["entries", bookId], (old: Entry[]) => {
        return [newEntry, ...old];
      });

      return { previousEntries };
    },
    onError: (context: any) => {
      queryClient.setQueryData(["entries", bookId], context.previousEntries);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["entries", bookId] });
    },
  });

  const createNewEntry = () => {
    const newEntry = {
      id: uuidv4(),
      bookId: bookId,
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favourite: false,
      index: 0,
    };
    addEntryMutation.mutate(newEntry);
    onEntrySelected(newEntry);
  };

  useEffect(() => {
    if (orderBy === "custom") {
      const orderedEntries = bookEntries.sort((a, b) => a.index - b.index);
      setEntries(orderedEntries);
    } else if (orderBy === "date-added") {
      const orderedEntries = sortByDate(bookEntries);
      setEntries(orderedEntries);
    } else if (orderBy === "favourites") {
      const orderedEntries = sortByFavourites(bookEntries);
      setEntries(orderedEntries);
    }
  }, [bookEntries]);

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ArrowDownWideNarrow className="h-8 w-8  cursor-pointer rounded-md p-1 text-gray-200 hover:bg-white/20" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="font-monteserrat w-40">
                  <DropdownMenuLabel>Order By:</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={orderBy}
                    onValueChange={(newOrderBy) => {
                      setOrderBy(newOrderBy);
                      if (newOrderBy === "custom") {
                        const orderedEntries =
                          bookEntries?.sort((a, b) => a.index - b.index) || [];
                        setEntries(orderedEntries);
                      } else if (newOrderBy === "date-added") {
                        const entriesByDate = sortByDate(bookEntries);
                        setEntries(entriesByDate);
                      } else if (newOrderBy === "favourites") {
                        const entriesByFavourites =
                          sortByFavourites(bookEntries);
                        setEntries(entriesByFavourites);
                      }
                    }}
                  >
                    <DropdownMenuRadioItem value="custom">
                      Drag and drop
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="date-added">
                      Date Added
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="favourites">
                      Favourites
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

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
                if (orderBy !== "custom") return;
                newOrder.forEach((entry, index) => {
                  entry.index = index;
                });
                updateEntryOrder(bookId, newOrder);
                setEntries(newOrder);
              }}
            >
              {entries?.map((entry) => (
                <Reorder.Item
                  dragListener={orderBy === "custom"}
                  key={entry.id}
                  value={entry}
                  onClick={() => {
                    onEntrySelected(entry);
                    queryClient.invalidateQueries({
                      queryKey: ["entries", bookId],
                    });
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
