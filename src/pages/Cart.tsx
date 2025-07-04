import styled from 'styled-components';
import Title from '../components/common/Title';
import useCart from '../hooks/useCart';
import {useMemo, useState} from 'react';
import {CartItem} from '../components/cart/CartItem';
import Empty from '../components/common/Empty';
import {FaShoppingCart} from 'react-icons/fa';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import useAlert from '../hooks/useAlert';
import {OrderSheet} from '../models/oder.model';
import {useNavigate} from 'react-router-dom';

const Cart = () => {
  const {carts, deleteCartItem, isEmpty} = useCart();
  const {showAlert, showConfirm} = useAlert();
  const nav = useNavigate();

  const [checkedItems, setCkeckedItems] = useState<number[]>([]);

  const handleCheckItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCkeckedItems(checkedItems.filter(item => item !== id));
    } else {
      setCkeckedItems([...checkedItems, id]);
    }
  };

  const handleItemDelete = (id: number) => {
    deleteCartItem(id);
  };

  const totalQuantity = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.cart_id)) {
        return acc + cart.quantity;
      }

      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const totalPrice = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.cart_id)) {
        return acc + cart.price * cart.quantity;
      }

      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const handleOrder = () => {
    if (checkedItems.length === 0) {
      showAlert('주문할 상품을 선택해 주세요.');
      return;
    }

    // 주문서 작성으로 데이터 전달
    const orderData: Omit<OrderSheet, 'delivery'> = {
      items: checkedItems,
      total_price: totalPrice,
      total_quantity: totalQuantity,
      first_book_title: carts[0].title,
    };

    showConfirm('주문하시겠습니까?', () => {
      nav('/order', {state: orderData});
    });
  };

  return (
    <>
      <Title size="large">장바구니</Title>
      <CartStyle>
        {!isEmpty && (
          <>
            <div className="content">
              {carts.map(item => (
                <CartItem
                  key={item.cart_id}
                  cart={item}
                  checkedItems={checkedItems}
                  onCheck={handleCheckItem}
                  onDelete={handleItemDelete}
                />
              ))}
            </div>
            <div className="summary">
              <CartSummary
                total_quantity={totalQuantity}
                total_price={totalPrice}
              />
              <Button size="large" scheme="primary" onClick={handleOrder}>
                주문 하기
              </Button>
            </div>
          </>
        )}
        {isEmpty && (
          <Empty
            title="장바구니가 비었습니다"
            icon={<FaShoppingCart />}
            description={<>장바구니를 채워보세요</>}
          />
        )}
      </CartStyle>
    </>
  );
};

export const CartStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0 0 0;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .order-info {
    h1 {
      padding: 0 0 24px 0;
    }

    border: 1px solid ${({theme}) => theme.color.border};
    border-radius: ${({theme}) => theme.borderRadius.default};
    padding: 12px;
  }

  .delivery {
    fieldset {
      border: 0;
      margin: 0;
      padding: 0 0 12px 0;
      display: flex;
      justify-content: start;
      gap: 8px;

      label {
        width: 80px;
      }

      .input {
        flex: 1;
        input {
          width: 100%;
        }
      }
    }

    .error-text {
      color: red;
      margin: 0;
      padding: 0 0 12px 0;
      text-align: right;
    }
  }
`;

export default Cart;
