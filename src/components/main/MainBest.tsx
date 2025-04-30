import React from 'react';
import styled from 'styled-components';
import {Book} from '../../models/book.model';
import BookBestItem from '../Books/BookBestItem';

interface Props {
  books: Book[];
}

const MainBest = ({books}: Props) => {
  return (
    <MainBestStyle>
      {books.map((item, idx) => (
        <BookBestItem key={item.id} book={item} itemIndex={idx} />
      ))}
    </MainBestStyle>
  );
};

const MainBestStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  @media screen and ${({theme}) => theme.mediaQuery.mobile} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

export default MainBest;
