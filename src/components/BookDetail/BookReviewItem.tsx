import styled from 'styled-components';
import {BookReviewItem as IBookReviewItem} from '../../models/book.model';
import {formatDate} from '../../utils/Format';
import {FaStar} from 'react-icons/fa';

interface Props {
  review: IBookReviewItem;
}

const Star = (props: Pick<IBookReviewItem, 'score'>) => {
  return (
    <span className="star">
      {Array.from({length: props.score}, (_, idx) => (
        <span key={idx}>
          <FaStar />
        </span>
      ))}
    </span>
  );
};

const BookReviewItem = ({review}: Props) => {
  return (
    <BookReviewItemStyle>
      <header className="header">
        <div>
          <span>{review.userName}</span>
          <Star score={review.score} />
        </div>

        <div>{formatDate(review.createdAt)}</div>
      </header>
      <div className="content">
        <p>{review.content}</p>
      </div>
    </BookReviewItemStyle>
  );
};

const BookReviewItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  padding: 12px;
  border-radius: ${({theme}) => theme.borderRadius.default};

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    color: ${({theme}) => theme.color.secondary};
    padding: 0;
  }

  .star {
    padding: 0 0 0 8px;
    svg {
      fill: ${({theme}) => theme.color.primary};
    }
  }

  .content {
    p {
      font-size: 1rem;
      line-height: 1.5;
      margin: 0;

      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export default BookReviewItem;
