import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { getBooks } from "@/pages/api/books";

// This could also be getServerSideProps

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getBooks,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function App() {
  const { data } = useQuery({ queryKey: ["posts"], queryFn: getBooks });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default App;
