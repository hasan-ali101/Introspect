import { integer, text, boolean, pgTable, date } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: text("id").primaryKey().notNull().unique(),
  userId: text("userId").notNull(),
  title: text("title"),
  color: text("color"),
  label: boolean("label"),
  notebook: boolean("notebook"),
  coverImage: text("coverImage"),
  uploadedImage: text("uploadedImage"),
  pin: integer("pin"),
});

export const entries = pgTable("entries", {
  id: text("id").primaryKey().notNull().unique(),
  bookId: text("bookId").notNull(),
  content: text("content"),
  createdAt: date("createdAt", { mode: "string" }),
  updatedAt: date("updatedAt", { mode: "string" }),
  favourite: boolean("favourite"),
});

export const entryOrder = pgTable("entryOrder", {
  id: text("id").primaryKey().notNull().unique(),
  bookId: text("bookId").notNull(),
  order: integer("order"),
});
