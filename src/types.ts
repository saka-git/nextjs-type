export interface BookWithAuthor {
  id: number;
  title: string;
  content: string;
  authorId: number;
  authorName: string | null; // 修正: null を許容
}
