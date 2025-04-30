import {Cart} from '../models/cart.model';
import {httpClient} from './http';

interface AddCartParams {
  cart_book_id: number;
  quantity: number;
}

export const addCart = async (params: AddCartParams) => {
  const res = await httpClient.post(`/carts`, params);

  return res.data;
};

export const fetchCart = async () => {
  const res = await httpClient.get<Cart[]>(`/carts`);

  return res.data;
};

export const deleteCart = async (cartId: number) => {
  const res = await httpClient.delete(`/carts/${cartId}`);

  return res.data;
};
