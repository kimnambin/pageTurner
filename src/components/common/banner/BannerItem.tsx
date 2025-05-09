import styled from 'styled-components';
import {Banner} from '../../../models/banner.model';

interface Props {
  banner: Banner;
}

const BannerItem = ({banner}: Props) => {
  return (
    <BannerItemStyle>
      <h2>{banner.title}</h2>
      <div className="img">
        <img src={banner.thumbnail} alt={banner.title} />
      </div>
      <p>{banner.contents}</p>
      {/* <div className="content">
        <h2>{banner.title}</h2>
        <p>{banner.contents}</p>
      </div> */}
    </BannerItemStyle>
  );
};

const BannerItemStyle = styled.div`
  flex: 0 0 100%;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  position: relative;
  width: 80%;
  height: 150px;

  .img {
    img {
      width: 100%;
      max-width: 100%;
    }
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: ${props => props.theme.color.primary};
    width: 20%;
  }

  p {
    font-size: 0.75rem;
    color: ${props => props.theme.color.text};
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 30%;
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: ${props => props.theme.color.primary};
    }

    p {
      font-size: 1rem;
      color: ${props => props.theme.color.text};
      margin: 0;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  @media screen and (max-width: 768px) {
    .content {
      width: 100%;
      background: linear-gradient(
        to top,
        rgba(255, 255, 255, 1),
        rgba(255, 255, 255, 0)
      );

      h2 {
        font-size: 1.5rem;
        margin-bottom: 8px;
      }
      p {
        font-size: 0.75rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
`;

export default BannerItem;
