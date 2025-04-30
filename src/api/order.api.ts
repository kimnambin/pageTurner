import {OrderSheet} from '../models/oder.model';
import {requestHandler} from './http';

// export const order = async (orderData: OrderSheet) => {
//   const res = await httpClient.post('/orders', orderData);
//   return res.data;
// };

export const order = async (orderData: OrderSheet) => {
  return requestHandler('post', '/orders', orderData);
};

export const fetchOrders = async () => {
  return requestHandler('get', '/orders');
};

export const fetchOrderDetail = async (id: number) => {
  return requestHandler('get', `/orders/${id}`);
};
