import { index } from "drizzle-orm/mysql-core";

export type Entry = {
  id: string;
  bookId: string;
  content: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  favourite: boolean | null;
  index: number;
};
