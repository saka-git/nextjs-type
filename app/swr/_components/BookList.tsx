// components/BookList.tsx

import React from "react";
import { BookWithAuthor } from "@/src/types";

interface BookListProps {
  books: BookWithAuthor[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">本の一覧</h2>
      {books.length === 0 ? (
        <p>本がありません。</p>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.id} className="p-4 border rounded">
              <p className="font-semibold">タイトル：{book.title}</p>
              <p>内容：{book.content}</p>
              <p>著者：{book.authorName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
