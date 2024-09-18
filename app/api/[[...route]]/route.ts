import { Hono } from "hono";
import { handle } from "hono/vercel";

import getBooks from "./getBooks";
import createAuthor from "./createAuthor";
import createBook from "./createBook";
import getAuthors from "./getAuthors";

const app = new Hono().basePath("/api");

/* eslint-disable @typescript-eslint/no-unused-vars */
const route = app
  .route("/books", getBooks)
  .route("/author/create", createAuthor)
  .route("/books/create", createBook)
  .route("/authors", getAuthors);
/* eslint-enable @typescript-eslint/no-unused-vars */

export type AppType = typeof route;

export const GET = handle(app);
export const POST = handle(app);
