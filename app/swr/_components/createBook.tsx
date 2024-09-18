// components/BookForm.tsx

"use client";

import React, { useState, useEffect } from "react";
import { hc } from "hono/client";
import { AppType } from "../../api/[[...route]]/route";
import { SelectAuthor } from "@/src/db/schema";

const client = hc<AppType>("http://localhost:3000");

export default function BookForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState<number | "">("");
  const [authors, setAuthors] = useState<SelectAuthor[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 著者一覧を取得
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await client.api.authors.$get();
        if (!res.ok) {
          throw new Error("Failed to fetch authors");
        }
        const data = await res.json();
        setAuthors(data.authors);
      } catch (error) {
        console.error("著者の取得中にエラーが発生しました:", error);
      }
    };

    fetchAuthors();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const newBook = {
      title,
      content,
      authorId: authorId !== "" ? Number(authorId) : undefined,
    };

    try {
      const res = await client.api.books.create.$post({
        json: newBook,
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("本が正常に作成されました");
        // フォームをリセット
        setTitle("");
        setContent("");
        setAuthorId("");
      } else {
        setMessage("エラーが発生しました: " + data.result);
      }
    } catch (error) {
      console.error("リクエスト中にエラーが発生しました:", error);
      setMessage("リクエスト中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-8">
      <h2 className="text-xl font-bold mb-6">本の作成</h2>
      {message && (
        <p
          className={`mb-4 ${
            message.includes("成功") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            タイトル:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            内容:
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 h-32"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            著者:
          </label>
          <select
            value={authorId}
            onChange={(e) =>
              setAuthorId(e.target.value !== "" ? Number(e.target.value) : "")
            }
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">選択してください</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
        >
          {loading ? "送信中..." : "作成"}
        </button>
      </form>
    </div>
  );
}
