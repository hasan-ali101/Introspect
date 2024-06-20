import BackgroundImage from "@/components/background-image";
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

export default function Page() {
  const { userId } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(userId as string),
    staleTime: Infinity,
  });

  const router = useRouter();
  console.log(router.query.id);

  const book: IBook | undefined = data?.find(
    (book: IBook) => book.id === router.query.id,
  );
  console.log(book);

  return (
    <main
      className={cn(
        `relative flex min-h-[400px] flex-col items-center bg-gradient-to-t px-10 dark:from-[#7e80e7] dark:to-dark-primary 2xl:py-10 ${inter.className}`,
      )}
    >
      <BackgroundImage />
      <div className="flex h-80 items-center justify-center">
        <h1 className="text-4xl font-bold">{book?.title}</h1>
      </div>
    </main>
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
