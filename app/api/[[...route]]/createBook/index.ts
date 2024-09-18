// routes/createBook.ts

import { Hono } from "hono";
import { createBook } from "@/src/db/query/insert";

const app = new Hono().post("/", async (c) => {
  try {
    const newBook = await c.req.json();

    await createBook(newBook);
    console.log("本が正常に作成されました");
    return c.json({ result: "success" });
  } catch (error) {
    console.error("本の作成中にエラーが発生しました:", error);
    return c.json({ result: "error" }, 500);
  }
});

export default app;
