import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { showCartHandler } from '../../store/ui-slice';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const uiShowCartHandler = () => {
    dispatch(showCartHandler());
  };

  return (
    <button className={classes.button} onClick={uiShowCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
