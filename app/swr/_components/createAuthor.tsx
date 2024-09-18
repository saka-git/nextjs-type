"use client";

import { AppType } from "../../api/[[...route]]/route";
import { hc } from "hono/client";
import { useState } from "react";

const client = hc<AppType>("http://localhost:3000");

export default function AuthorForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const newAuthor = {
      name,
      age: age !== "" ? Number(age) : undefined,
      email,
    };

    try {
      const res = await client.api.author.create.$post({
        json: newAuthor,
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("著者が正常に作成されました");
        // フォームをリセット
        setName("");
        setAge("");
        setEmail("");
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
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6">著者の作成</h1>
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
            名前:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            年齢:
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) =>
              setAge(e.target.value !== "" ? Number(e.target.value) : "")
            }
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            メール:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
        >
          {loading ? "送信中..." : "作成"}
        </button>
      </form>
    </div>
  );
}
