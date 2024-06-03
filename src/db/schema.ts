import { integer, text, boolean, pgTable } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: integer("id").primaryKey().notNull(),
  userId: integer("userId").notNull(),
  title: text("title"),
  color: text("color"),
  label: boolean("label"),
  notebook: boolean("notebook"),
  coverImage: text("coverImage"),
  uploadedImage: text("uploadedImage"),
  pin: integer("pin"),
});
