import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import {
  dehydrate,
  QueryClient,
  useQuery,
  // useQueryClient,
} from "@tanstack/react-query";
import getBooks from "@/utils/getBooks";
import { IBook } from "@/types/book";
import { GetServerSideProps } from "next";
import { getAuth, buildClerkProps } from "@clerk/nextjs/server";
import { useAuth } from "@clerk/nextjs";
import { useMemo, useState, useEffect } from "react";
import { Doc as YDoc } from "yjs";

import { BlockEditor } from "@/tiptap/components/BlockEditor";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import getEntries from "@/utils/getEntries";
import { Entry } from "@/types/entry";

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<Entry | undefined>(
    undefined,
  );

  const ydoc = useMemo(() => new YDoc(), []);
  const { userId } = useAuth();

  const { data } = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(userId as string),
    staleTime: Infinity,
  });

  const { data: entries } = useQuery({
    queryKey: ["entries"],
    queryFn: () => getEntries(router.query.id as string),
    staleTime: Infinity,
  });

  const router = useRouter();

  const book: IBook | undefined = data?.find(
    (book: IBook) => book.id === router.query.id,
  );

  useEffect(() => {
    console.log(selectedEntry?.content);
  }, [selectedEntry]);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 md:mt-8">
        <div className="flex w-full flex-col-reverse items-center justify-between gap-2 sm:flex-row">
          <Link href="/write">
            <div className="flex cursor-pointer gap-2 rounded-xl text-sm hover:bg-white/20 sm:p-4 md:text-base">
              <ArrowLeft /> <p>back to all books</p>
            </div>
          </Link>
          <h1 className="p-4 text-xl font-bold  md:text-2xl">
            Title: {book?.title}
          </h1>
          <div className="w-40"></div>
        </div>
        <div className="flex h-[600px] rounded-3xl border ">
          <Sidebar
            isOpen={sidebarOpen}
            toggleSidebar={() => setSidebarOpen((state) => !state)}
            bookEntries={entries}
            onEntrySelected={setSelectedEntry}
          />
          <div
            className={cn(
              sidebarOpen
                ? "w-0 sm:w-[430px] md:w-[480px] lg:w-[720px]"
                : "w-64 sm:w-[500px] md:w-[550px]  lg:w-[770px]",
              " h-full overflow-auto rounded-r-3xl bg-[#696bcabf] pt-6 opacity-100 transition-all",
            )}
          >
            <BlockEditor
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
    queryKey: ["entries"],
    queryFn: () => getEntries(ctx.query.id as string),
    staleTime: Infinity,
  });

  return {
    props: {
      ...clerkProps,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
