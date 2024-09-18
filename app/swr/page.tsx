// pages/SwrPage.tsx

"use client";

import useSWR from "swr";
import { hc } from "hono/client";
import AuthorForm from "./_components/createAuthor";
import BookForm from "./_components/createBook";
import BookList from "./_components/BookList";
import { AppType } from "@/app/api/[[...route]]/route";
import { BookWithAuthor } from "@/src/types";

const client = hc<AppType>("http://localhost:3000");

// fetcher 関数
async function fetcher(key: string): Promise<{ books: BookWithAuthor[] }> {
  const res = await client.api.books.$get();
  if (!res.ok) {
    // エラーの場合、例外をスロー
    throw new Error("データの取得に失敗しました");
  }
  const data = await res.json();
  return data;
}

export default function SwrPage() {
  const { data, error, isLoading } = useSWR("/api/books", fetcher);

  if (error) return <div>エラーが発生しました</div>;
  if (isLoading) return <div>読み込み中...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6">本と著者の管理</h1>
      {data && <BookList books={data.books} />}
      <AuthorForm />
      <BookForm />
    </div>
  );
}
