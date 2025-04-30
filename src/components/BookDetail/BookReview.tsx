import React from 'react';
import styled from 'styled-components';
import {
  BookReviewItemWrite,
  BookReviewItem as IBookReviewItem,
} from '../../models/book.model';
import BookReviewItem from './BookReviewItem';
import BookReviewAdd from './BookReviewAdd';

interface Props {
  reviews: IBookReviewItem[];
  onAdd: (data: BookReviewItemWrite) => void;
}

const BookReview = ({reviews, onAdd}: Props) => {
  return (
    <BookReviewStyle>
      <BookReviewAdd onAdd={onAdd} />
      {reviews.map(item => (
        <BookReviewItem review={item} />
      ))}
    </BookReviewStyle>
  );
};

const BookReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default BookReview;
