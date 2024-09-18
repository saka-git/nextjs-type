// routes/getBooks.ts

import { Hono } from "hono";
import { db } from "@/src/db/index";
import { booksTable, authorsTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

const app = new Hono().get("/", async (c) => {
  try {
    const books = await db
      .select({
        id: booksTable.id,
        title: booksTable.title,
        content: booksTable.content,
        authorId: booksTable.authorId,
        authorName: authorsTable.name,
      })
      .from(booksTable)
      .leftJoin(authorsTable, eq(booksTable.authorId, authorsTable.id));

    return c.json({ books });
  } catch (error) {
    console.error("本の取得中にエラーが発生しました:", error);
    return c.json({ result: "error" }, 500);
  }
});

export default app;
