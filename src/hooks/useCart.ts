import {useEffect, useState} from 'react';
import {Cart} from '../models/cart.model';
import {deleteCart, fetchCart} from '../api/carts.api';

const useCart = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [isEmpty, setIsempty] = useState(true);

  const deleteCartItem = (id: number) => {
    deleteCart(id).then(() => {
      setCarts(carts.filter(cart => cart.id !== id));
    });
  };

  useEffect(() => {
    fetchCart().then(cart => {
      setCarts(cart);
      setIsempty(cart.length === 0);
    });
  }, []);

  return {carts, isEmpty, deleteCartItem};
};

export default useCart;
