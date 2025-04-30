import {useLocation} from 'react-router-dom';
import {fetchBooks} from '../api/books.api';
import {QUERYSTRING} from '../constants/querySting';
import {LIMIT} from '../constants/pagination';
import {useInfiniteQuery} from '@tanstack/react-query';

export const useBooksInfinite = () => {
  const location = useLocation();

  const getBooks = async ({pageParam}: {pageParam: number}) => {
    const params = new URLSearchParams(location.search);
    const category_id = params.get(QUERYSTRING.CATEGORY_ID)
      ? Number(params.get(QUERYSTRING.CATEGORY_ID))
      : undefined;

    const news = params.get(QUERYSTRING.NEWS) ? true : undefined;

    const limit = LIMIT;
    const currentPage = pageParam;

    return await fetchBooks({
      category_id,
      news,
      limit,
      currentPage,
    });
  };

  const {data, fetchNextPage, hasNextPage, isFetching} = useInfiniteQuery({
    queryKey: ['books', location.search],
    queryFn: ({pageParam = 1}) => getBooks({pageParam}),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (!lastPage.pagination) return null;

      const isLastPage =
        Math.ceil(lastPage.pagination.totalCount / LIMIT) ===
        lastPage.pagination.currentPage;

      return isLastPage ? null : lastPage.pagination.currentPage + 1;
    },
  });

  const books = data ? data.pages.flatMap(page => page.books) : [];
  const pagination = data ? data.pages[data.pages.length - 1].pagination : {};
  const isEmpty = books.length == 0;

  return {
    books,
    pagination,
    isEmpty,
    isBooksLoading: isFetching,
    fetchNextPage,
    hasNextPage,
  };
};
