import styled from 'styled-components';
import {BookDetail} from '../../models/book.model';
import InputText from '../common/InputText';
import Button from '../common/Button';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useBook} from '../../hooks/useBookDetail';

interface Props {
  book: BookDetail;
}

const AddToCart = ({book}: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const {addToCart, cartAdded} = useBook(book.id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleIncrese = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrese = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  return (
    <AddToCartStyle $added={cartAdded}>
      <div>
        <InputText
          inputType="number"
          value={quantity}
          onChange={handleChange}
        />
        <Button size="medium" scheme="normal" onClick={handleIncrese}>
          +
        </Button>
        <Button size="medium" scheme="normal" onClick={handleDecrese}>
          -
        </Button>
      </div>
      <div>
        <Button
          size="medium"
          scheme="primary"
          className="addCart"
          onClick={() => {
            addToCart(quantity);
          }}>
          장바구니 담기
        </Button>
      </div>

      <div className="added">
        <p>장바구니에 추가되었습니다.</p>
        <Link to="/cart">장바구니로 이동</Link>
      </div>
    </AddToCartStyle>
  );
};

interface AddToCartStyleProps {
  // 스타일에 영향을 주는 속성
  $added: boolean;
}

const AddToCartStyle = styled.div<AddToCartStyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  position: relative;
  gap: 24px;

  Button {
    margin: 1.5px;
  }

  .added {
    position: absolute;
    right: 0;
    bottom: -90ox;
    background: ${({theme}) => theme.color.background};
    border-radius: ${({theme}) => theme.borderRadius.default};
    padding: 8px 12px;
    opacity: ${({$added}) => ($added ? '1' : '0')};
    transition: all 0.5s ease;

    p {
      padding: 0 0 8px 0;
      margin: 0;
    }
  }
`;

export default AddToCart;
