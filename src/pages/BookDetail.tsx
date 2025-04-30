import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import {useBook} from '../hooks/useBookDetail';
import {getImgSrc} from '../utils/image';
import Title from '../components/common/Title';
import {BookDetail as IBookDetail} from '../models/book.model';
import {formatDate, formatNumber} from '../utils/Format';
import {Link} from 'react-router-dom';
import LikeButton from '../components/BookDetail/LikeButton';
import AddToCart from '../components/BookDetail/AddToCart';
import BookReview from '../components/BookDetail/BookReview';
import ElipsisBox from '../components/common/ElipsisBox';
import {Tabs, Tab} from '../components/common/Tabs';
import {Modal} from '../components/common/Modal';

const bookInfoList = [
  {
    label: '카테고리',
    key: 'category_name',
    filter: (book: IBookDetail) => (
      <Link to={`/books?category_id=${book.category_id}`}>
        {book.category_name}
      </Link>
    ),
  },
  {
    label: '포맷',
    key: 'form',
  },
  {
    label: '페이지',
    key: 'pages',
  },
  {
    label: 'ISBN',
    key: 'isbn',
  },
  {
    label: '출간일',
    key: 'pub_date',
    filter: (book: IBookDetail) => {
      return formatDate(book.pub_date);
    },
  },
  {
    label: '가격',
    key: 'price',
    filter: (book: IBookDetail) => {
      return `${formatNumber(book.price)} 원`;
    },
  },
];

function BookDetail() {
  const {bookId} = useParams();
  const {book, likeToggle, reviews, addReview} = useBook(Number(bookId));

  const [isOpen, setIsOpen] = useState(false);

  if (!book) return null;

  return (
    <BookDetailStyle>
      <header className="header">
        <div className="img" onClick={() => setIsOpen(true)}>
          <img src={getImgSrc(book.img)} alt={book.title} />
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <img src={getImgSrc(book.img)} alt={book.title} />
          </Modal>
        </div>
        <div className="info">
          <Title size="large" color="text">
            {book.title}
          </Title>
          {bookInfoList.map(item => (
            <dl key={item.key}>
              <dt>{item.label}</dt>
              <dd>
                {item.filter
                  ? item.filter(book)
                  : book[item.key as keyof IBookDetail]}
              </dd>
            </dl>
          ))}
          <p className="summary">{book.summary}</p>

          <div className="like">
            <LikeButton book={book} onClick={likeToggle} />
          </div>

          <div className="add-cart">
            <AddToCart book={book} />
          </div>
        </div>
      </header>
      <div className="content">
        <Tabs>
          <Tab title="상세 설명">
            <Title size="medium">상세 설명</Title>
            <ElipsisBox linelimit={4}>{book.detail}</ElipsisBox>
          </Tab>
          <Tab title="목차">
            <Title size="medium">목차</Title>
            <p className="index">{book.contents}</p>
          </Tab>
          <Tab title="리뷰">
            <Title size="medium">리뷰</Title>
            <BookReview reviews={reviews} onAdd={addReview} />
          </Tab>
        </Tabs>
      </div>
    </BookDetailStyle>
  );
}

const BookDetailStyle = styled.div`
  .header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding: 0 0 24px 0;

    .img {
      flex: 1;
      img {
        width: 100%;
        height: auto;
      }
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;

      dl {
        display: flex;
        margin: 0;
        dt {
          width: 80px;
          color: ${({theme}) => theme.color.secondary};
        }
        a {
          color: ${({theme}) => theme.color.primary};
        }
      }
    }
  }

  .content {
  }
`;

export default BookDetail;
