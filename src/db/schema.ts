import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const authorsTable = pgTable("authors_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  email: text("email").notNull().unique(),
});

export const booksTable = pgTable("books_table", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: integer("author_id")
    .notNull()
    .references(() => authorsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertAuthor = typeof authorsTable.$inferInsert;
export type SelectAuthor = typeof authorsTable.$inferSelect;

export type InsertBook = typeof booksTable.$inferInsert;
export type SelectBook = typeof booksTable.$inferSelect;
