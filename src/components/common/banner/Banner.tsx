import {useMemo, useState} from 'react';
import styled, {css} from 'styled-components';
import {Banner as IBanner} from '../../../models/banner.model';
import BannerItem from './BannerItem';
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa';

interface Props {
  banners: IBanner[];
}

const Banner = ({banners}: Props) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const transFormValue = useMemo(() => {
    return currentIdx * -100;
  }, [currentIdx]);

  const handlePrev = () => {
    if (currentIdx === 0) return;
    setCurrentIdx(currentIdx - 1);
  };
  const handleNext = () => {
    if (currentIdx === banners.length - 1) return;
    setCurrentIdx(currentIdx + 1);
  };

  const handlePagiation = (idx: number) => {
    setCurrentIdx(idx);
  };

  return (
    <BannerStyle>
      <BannerContainerStyle $transFormValue={transFormValue}>
        {banners.map(item => (
          <BannerItem banner={item} key={item.title} />
        ))}
      </BannerContainerStyle>

      <BannerButtonStyle>
        <button onClick={handlePrev} className="prev">
          <FaAngleLeft />
        </button>
        <button onClick={handleNext} className="next">
          <FaAngleRight />
        </button>
      </BannerButtonStyle>

      <BannerIndicatorStyle>
        {banners.map((_, idx) => (
          <span
            className={idx === currentIdx ? 'active' : ''}
            onClick={() => handlePagiation(idx)}
            key={idx}></span>
        ))}
      </BannerIndicatorStyle>
    </BannerStyle>
  );
};

const BannerStyle = styled.div`
  overflow: hidden;
  position: relative;
`;

interface BannerContainerStyleProps {
  $transFormValue: number;
}

const BannerContainerStyle = styled.div<BannerContainerStyleProps>`
  display: flex;
  transform: translateX(${props => props.$transFormValue}%);
  transition: transform 0.5s ease-in-out;
`;

const BannerButtonStyle = styled.div`
  button {
    border: 0;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 500px;
    font-size: 2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    svg {
      fill: #fff;
    }

    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }

    ${({theme}) => css`
      @media ${theme.mediaQuery.mobile} {
        width: 28px;
        height: 28px;
        font-size: 1.5rem;

        &.prev {
          left: 0;
        }
        &.next {
          right: 0;
        }
      }
    `}
  }
`;

const BannerIndicatorStyle = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);

  span {
    display: inline-block;
    width: 13px;
    height: 13px;
    border-radius: 100px;
    background: #fff;
    margin: 0 4px;
    cursor: pointer;

    &.active {
      background: ${({theme}) => theme.color.primary};
    }
  }

  ${({theme}) => css`
  @media ${theme.mediaQuery.mobile} {

    bottom: 0;
    span {
      width: 11px;
      height: 11px;

      &.active {
        width: 24px;
      }
    }
  `}
`;

export default Banner;
