// routes/getAuthors.ts

import { Hono } from "hono";
import { db } from "@/src/db/index";
import { authorsTable } from "@/src/db/schema";

const app = new Hono().get("/", async (c) => {
  try {
    const authors = await db.select().from(authorsTable);
    return c.json({ authors });
  } catch (error) {
    console.error("著者の取得中にエラーが発生しました:", error);
    return c.json({ result: "error" }, 500);
  }
});

export default app;
