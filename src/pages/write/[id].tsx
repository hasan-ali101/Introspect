import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import {
  dehydrate,
  QueryClient,
  useQuery,
  // useQueryClient,
} from "@tanstack/react-query";
const inter = Inter({ subsets: ["latin"] });
import getBooks from "@/utils/getBooks";
import { IBook } from "@/types/book";
import { GetServerSideProps } from "next";
import { getAuth, buildClerkProps } from "@clerk/nextjs/server";
import { useAuth } from "@clerk/nextjs";
import { useMemo } from "react";
import { Doc as YDoc } from "yjs";

import { BlockEditor } from "@/tiptap/components/BlockEditor";

export default function Page() {
  const ydoc = useMemo(() => new YDoc(), []);
  const { userId } = useAuth();

  const { data } = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(userId as string),
    staleTime: Infinity,
  });

  const router = useRouter();
  console.log(router.query.id);

  const book: IBook | undefined = data?.find(
    (book: IBook) => book.id === router.query.id,
  );

  return (
    <>
      <div className="flex  flex-col items-center justify-center gap-6 px-10 md:mt-8 md:px-16">
        <h1 className="text-2xl font-bold md:text-4xl">{book?.title}</h1>
        <div className="flex h-[500px] rounded-3xl border bg-dark-tertiary ">
          <div className="hidden h-full rounded-l-3xl border transition-all md:flex md:w-64 lg:w-72 "></div>
          <div className=" border-left  h-full  w-80 overflow-auto pt-6 transition-all md:w-[500px] lg:w-[740px]">
            <BlockEditor hasCollab={false} ydoc={ydoc} />
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

  if (!userId) {
    console.log("User not authenticated");
  } else {
    await queryClient.prefetchQuery({
      queryKey: ["books"],
      queryFn: () => getBooks(userId),
      staleTime: Infinity,
    });
  }

  return {
    props: {
      ...clerkProps,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
