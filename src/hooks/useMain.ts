import {useEffect, useState} from 'react';
import {Book, BookReviewItem} from '../models/book.model';
import {fetchReviewAll} from '../api/review.api';
import {fetchBestBooks, fetchBooks} from '../api/books.api';

export const useMain = () => {
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);

  const [newBooks, setNewBooks] = useState<Book[]>([]);

  const [bestBooks, setBestBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchReviewAll().then(review => setReviews(review));

    fetchBooks({
      category_id: undefined,
      news: true,
      currentPage: 1,
      limit: 4,
    }).then(({books}) => {
      setNewBooks(books);
    });

    fetchBestBooks().then(bestbook => setBestBooks(bestbook));
  }, []);

  return {reviews, newBooks, bestBooks};
};
