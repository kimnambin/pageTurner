import React from 'react';
import styled from 'styled-components';
import {BookReviewItem as IBookReviewItem} from '../../models/book.model';
import BookReviewItem from '../BookDetail/BookReviewItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useMediaQuery} from '../../hooks/useMediaQuery';

interface Props {
  reviews: IBookReviewItem[];
}

const MainReview = ({reviews}: Props) => {
  const {isMobile} = useMediaQuery();

  const slicerSetting = {
    dots: true,
    Infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: isMobile ? 1 : 3,
    gap: 16,
  };

  return (
    <MainReviewStyle>
      <Slider {...slicerSetting}>
        {reviews.map(item => (
          <BookReviewItem key={item.id} review={item} />
        ))}
      </Slider>
    </MainReviewStyle>
  );
};

const MainReviewStyle = styled.div`
  padding: 0 0 24px 0;

  .slick-track {
    padding: 12px 0;
  }

  .slick-slide > div {
    margin: 0 12px;
  }

  .slick-prev:before,
  .slick-next:before {
    color: #000;
  }

  @media screen and ${({theme}) => theme.mediaQuery.mobile} {
    .slick-prev {
      left: 0;
    }

    .slick-next {
      right: 0;
    }
  }
`;

export default MainReview;
