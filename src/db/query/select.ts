import { asc, between, count, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "../index";
import { SelectAuthor, booksTable, authorsTable } from "../schema";

export async function getUserById(id: SelectAuthor["id"]): Promise<
  Array<{
    id: number;
    name: string;
    age: number;
    email: string;
  }>
> {
  return db.select().from(authorsTable).where(eq(authorsTable.id, id));
}

export async function getUsersWithPostsCount(
  page = 1,
  pageSize = 5
): Promise<
  Array<{
    postsCount: number;
    id: number;
    name: string;
    age: number;
    email: string;
  }>
> {
  return db
    .select({
      ...getTableColumns(authorsTable),
      postsCount: count(booksTable.id),
    })
    .from(authorsTable)
    .leftJoin(booksTable, eq(authorsTable.id, booksTable.authorId))
    .groupBy(authorsTable.id)
    .orderBy(asc(authorsTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function getPostsForLast24Hours(
  page = 1,
  pageSize = 5
): Promise<
  Array<{
    id: number;
    title: string;
  }>
> {
  return db
    .select({
      id: booksTable.id,
      title: booksTable.title,
    })
    .from(booksTable)
    .where(
      between(booksTable.createdAt, sql`now() - interval '1 day'`, sql`now()`)
    )
    .orderBy(asc(booksTable.title), asc(booksTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}
