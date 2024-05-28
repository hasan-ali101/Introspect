import { supabase } from "@/lib/utils";

export async function getBooks() {
  const { data } = await supabase.from("books").select("*");
  return data;
}
