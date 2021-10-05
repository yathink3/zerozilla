import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from './cart';

export const useCartDispatch = () => {
  const dispatch = useDispatch();
  let obj = {};
  Object.keys(cartActions).forEach(key => {
    if (key !== 'default') obj[key] = (...params) => dispatch(cartActions[key](...params));
  });
  return obj;
};

export const useCartStore = () => {
  const data = useSelector(({ cart }) => {
    return { ...cart, itemLength: cart.items.reduce((cur, ele) => cur + ele.count, 0) };
  });
  return data;
};
