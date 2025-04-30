import {useEffect, useState} from 'react';
import {Book, BookReviewItem} from '../models/book.model';
import {fetchReviewAll} from '../api/review.api';
import {fetchBestBooks, fetchBooks} from '../api/books.api';
import {Banner} from '../models/banner.model';
import {fetchBanners} from '../api/banner.api';

export const useMain = () => {
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);

  const [newBooks, setNewBooks] = useState<Book[]>([]);

  const [bestBooks, setBestBooks] = useState<Book[]>([]);

  const [banners, setBanners] = useState<Banner[]>([]);

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

    fetchBanners().then(banners => setBanners(banners));
  }, []);

  return {reviews, newBooks, bestBooks, banners};
};
