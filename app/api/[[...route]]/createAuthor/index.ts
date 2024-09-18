import { Hono } from "hono";
import { createAuthor } from "@/src/db/query/insert";

const app = new Hono().post("/", async (c) => {
  const data = await c.req.json();

  const newAuthor = {
    name: data.name,
    age: Number(data.age),
    email: data.email,
  };

  createAuthor(newAuthor)
    .then(() => {
      console.log("著者が正常に作成されました");
      return c.json({ result: "success" });
    })
    .catch((error) => {
      console.error("著者の作成中にエラーが発生しました:", error);
      return c.json({ result: "error" }, 500);
    });

  return c.json({ result: "success" });
});

export default app;
