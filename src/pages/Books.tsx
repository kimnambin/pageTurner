import styled from 'styled-components';
import Title from '../components/common/Title';
import Bookfilter from '../components/Books/Bookfilter';
import BooksList from '../components/Books/BooksList';
import BookEmpty from '../components/Books/BookEmpty';
import BookViewSwitcher from '../components/Books/BookViewSwitcher';
import Loading from '../components/common/Loading';
import React, {useEffect, useRef} from 'react';
import {useBooksInfinite} from '../hooks/useBooksInfinite';
import {useIntersectionObserver} from '../hooks/useIntersectionObserver';

const Books = () => {
  const {
    books,
    pagination,
    isEmpty,
    isBooksLoading,
    fetchNextPage,
    hasNextPage,
  } = useBooksInfinite();

  const moreRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      loadMore();
    }
  });

  const loadMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  if (isEmpty) {
    return <BookEmpty />;
  }

  if (!books || !pagination || isBooksLoading) {
    return <Loading />;
  }

  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BookStyle>
        <div className="filter">
          <Bookfilter />
          <BookViewSwitcher />
        </div>

        <BooksList books={books} />
        {/* <Pagination pagination={pagination} /> */}

        <div className="more" ref={moreRef}></div>
      </BookStyle>
    </>
  );
};

const BookStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;

export default Books;
