import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import {
  dehydrate,
  QueryClient,
  useQuery,
  // useQueryClient,
} from "@tanstack/react-query";
import getBooks from "@/utils/queries/getBooks";
import { IBook } from "@/types/book";
import { GetServerSideProps } from "next";
import { getAuth, buildClerkProps } from "@clerk/nextjs/server";
import { useAuth } from "@clerk/nextjs";
import { useMemo, useState } from "react";
import { Doc as YDoc } from "yjs";

import { BlockEditor } from "@/tiptap/components/BlockEditor";
import { ArrowLeft, Pencil } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import getEntries from "@/utils/queries/getEntries";
import { updateBook } from "@/utils/queries/updateBook";
import { Entry } from "@/types/entry";

export default function Page() {
  const { userId } = useAuth();
  const router = useRouter();
  const bookId = router.query.id as string;

  const { data } = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(userId as string),
    staleTime: Infinity,
  });
  const book: IBook | undefined = data?.find(
    (book: IBook) => book.id === bookId,
  );

  const { data: entries } = useQuery({
    queryKey: ["entries", bookId],
    queryFn: () => getEntries(bookId),
    staleTime: Infinity,
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<Entry | undefined>(
    entries?.[0],
  );
  const [editingTitle, setEditingTitle] = useState(false);
  const [bookTitle, setBookTitle] = useState(book?.title);

  const ydoc = useMemo(() => new YDoc(), []);

  const updateTitle = (title: string) => {
    updateBook({ ...book, title } as IBook);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 md:mt-8">
        <div className="flex w-full flex-col-reverse items-center justify-between gap-2 sm:flex-row">
          <Link href="/write">
            <div className="flex cursor-pointer gap-2 rounded-xl text-sm hover:bg-white/20 sm:p-4 md:text-base">
              <ArrowLeft /> <p>back to all books</p>
            </div>
          </Link>
          {editingTitle ? (
            <div className="relative">
              <Pencil className="absolute right-1 top-2 h-4 w-4" />
              <input
                maxLength={50}
                autoFocus
                type="text"
                placeholder="Book Title"
                className="w-full border-b-2 border-gray-300 bg-transparent pl-2 pr-6 text-xl outline-slate-100  md:text-2xl"
                value={bookTitle}
                onBlur={(e) => {
                  setEditingTitle(false), updateTitle(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    setEditingTitle(false), updateTitle(e.target.value);
                }}
                onChange={(e) => setBookTitle(e.target.value)}
              />
            </div>
          ) : (
            <h1
              className="p-4 text-xl font-bold hover:underline md:text-2xl"
              onClick={() => setEditingTitle(true)}
            >
              {bookTitle}
            </h1>
          )}

          <div className="w-40"></div>
        </div>
        <div className="flex h-[750px] rounded-3xl border ">
          <Sidebar
            isOpen={sidebarOpen}
            toggleSidebar={() => setSidebarOpen((state) => !state)}
            bookEntries={entries}
            onEntrySelected={setSelectedEntry}
            selectedEntryId={selectedEntry?.id}
            bookId={bookId}
          />
          <div
            className={cn(
              sidebarOpen
                ? "w-0 sm:w-[430px] md:w-[480px] lg:w-[720px]"
                : "w-64 sm:w-[500px] md:w-[550px]  lg:w-[770px]",
              " h-full overflow-visible overflow-y-clip rounded-r-3xl bg-[#696bcabf] pb-10 pt-6 opacity-100 md:transition-all",
            )}
          >
            <BlockEditor
              className={
                sidebarOpen
                  ? "w-0 sm:w-[430px] md:w-[480px] lg:w-[720px]"
                  : "w-64 sm:w-[500px] md:w-[550px]  lg:w-[770px]"
              }
              hasCollab={false}
              ydoc={ydoc}
              selectedEntry={selectedEntry}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);
  const queryClient = new QueryClient();
  const clerkProps = await buildClerkProps(ctx.req);
  const bookId = ctx.query.id as string;

  //TODO: get only the book that is being edited
  // only get the books if they are not already in cache
  if (!userId) {
    console.log("User not authenticated");
  } else {
    await queryClient.prefetchQuery({
      queryKey: ["books"],
      queryFn: () => getBooks(userId),
      staleTime: Infinity,
    });
  }
  await queryClient.prefetchQuery({
    queryKey: ["entries", bookId],
    queryFn: () => getEntries(bookId),
    staleTime: Infinity,
  });

  return {
    props: {
      ...clerkProps,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
