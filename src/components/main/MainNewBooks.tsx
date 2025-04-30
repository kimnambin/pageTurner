import React from 'react';
import styled from 'styled-components';
import {Book} from '../../models/book.model';
import BookItem from '../Books/BookItem';

interface Props {
  books: Book[];
}

const MainNewBooks = ({books}: Props) => {
  return (
    <MainNewBooksStyle>
      {books.map(item => (
        <BookItem key={item.id} book={item} view="grid" />
      ))}
    </MainNewBooksStyle>
  );
};

const MainNewBooksStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media screen and ${({theme}) => theme.mediaQuery.mobile} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default MainNewBooks;
