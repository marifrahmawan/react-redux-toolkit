import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';
import { cartAddItem, cartRemoveItem } from '../../store/cart-slice';

const CartItem = ({item}) => {
  const { id, title, price, totalPrice, quantity } = item;
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(cartAddItem({ id: id, quantity: 1, price: price }));
  };

  const removeFromCartHandler = () => {
    dispatch(cartRemoveItem(id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)} <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeFromCartHandler}>-</button>
          <button onClick={addToCartHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
