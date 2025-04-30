import styled from 'styled-components';
import Title from '../components/common/Title';
import {useOrders} from '../hooks/useOrders';
import {formatDate, formatNumber} from '../utils/Format';
import Button from '../components/common/Button';
import React from 'react';

const OrderList = () => {
  const {orders, seletedItem, seletOrderItem} = useOrders();

  return (
    <>
      <Title size="large">주문 내역</Title>
      <OrderListStyle>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>주문일자</th>
              <th>주소</th>
              <th>수령인</th>
              <th>전화번호</th>
              <th>대표상품명</th>
              <th>수량</th>
              <th>금액</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(item => (
              <React.Fragment key={item.id}>
                <tr>
                  <td>{item.id}</td>
                  <td>{formatDate(item.created_at, 'YYYY.MM.DD')}</td>
                  <td>{item.address}</td>
                  <td>{item.receiver}</td>
                  <td>{item.contact}</td>
                  <td>{item.book_title}</td>
                  <td>{item.total_quantity}권</td>
                  <td>{formatNumber(item.total_price)}원</td>
                  <td>
                    <Button
                      size="small"
                      scheme="normal"
                      onClick={() => seletOrderItem(item.id)}>
                      자세히
                    </Button>
                  </td>
                </tr>
                {seletedItem === item.id && (
                  <tr>
                    <td></td>
                    <ul className="detail">
                      <td colSpan={8}>
                        {item?.detail &&
                          item.detail.map(v => (
                            <li key={v.book_id}>
                              <div>
                                <span>{v.book_id}</span>
                                <span>{v.author}</span>
                                <span>{formatNumber(v.price)}원</span>
                              </div>
                            </li>
                          ))}
                      </td>
                    </ul>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </OrderListStyle>
    </>
  );
};

const OrderListStyle = styled.div`
  padding: 24px 0 0 0;

  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid ${({theme}) => theme.color.border};

    border-bottom: 1px solid ${({theme}) => theme.color.border};

    th,
    td {
      padding: 16px;
      border-bottom: 1px solid ${({theme}) => theme.color.border};
      text-align: center;
    }

    .detail {
      margin: 0;
      li {
        list-style: square;
        text-align: left;
        div {
          display: flex;
          padding: 8px 12px;
          gap: 8px;
        }
      }
    }
  }
`;

export default OrderList;
