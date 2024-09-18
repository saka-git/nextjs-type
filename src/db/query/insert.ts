import { db } from "../index";
import { InsertAuthor, InsertBook, authorsTable, booksTable } from "../schema";

export async function createAuthor(data: InsertAuthor) {
  await db.insert(authorsTable).values(data);
}

export async function createBook(data: InsertBook) {
  await db.insert(booksTable).values(data);
}
