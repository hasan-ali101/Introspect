import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ysbkdqnwrgomzajzcvau.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzYmtkcW53cmdvbXphanpjdmF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY4NDAyNTYsImV4cCI6MjAzMjQxNjI1Nn0.uG95GiBlGpxZkQa-1e0lO-yutE9TaqjrZu8cYPShYIg",
);

function App() {
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("books").select("*");
    if (data) {
      setNotes(data);
    }
  }

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}

export default App;
