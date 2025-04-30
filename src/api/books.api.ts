import {Book, BookDetail} from '../models/book.model';
import {Pagination} from '../models/pagination.model';
import {httpClient} from './http';

interface FetchBooksParams {
  category_id?: number;
  news?: boolean;
  limit: number;
  currentPage?: number;
}

export interface FetchRES {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const res = await httpClient.get<FetchRES>('/books/book_list', {
      params,
    });
    return res.data;
  } catch (e) {
    return {
      books: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
      },
    };
  }
};

export const fetchBook = async (bookId: number) => {
  const res = await httpClient.get<BookDetail>(`/books/book_detail/${bookId}`);
  return res.data;
};

export const likeBook = async (bookId: number) => {
  const res = await httpClient.post(`/likes/book_likes/${bookId}`);

  return res.data;
};

export const unLikeBook = async (bookId: number) => {
  const res = await httpClient.delete(`/likes/book_likes/${bookId}`);

  return res.data;
};

export const fetchBestBooks = async () => {
  const res = await httpClient.get<Book[]>(`/books/best`);

  return res.data;
};
