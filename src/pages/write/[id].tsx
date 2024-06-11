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

export default function Page() {
  const { data } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const router = useRouter();
  console.log(router.query.id);

  const book: IBook = data?.find((book: IBook) => book.id === router.query.id);
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

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
