import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Card className={classes.cart}>
      <h2>
        Your Shopping Cart - <span style={{ color: '#1ebeb1' }}>(${totalAmount.toFixed(2)})</span>
      </h2>
      <ul>
        {items.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </ul>
    </Card>
  );
};

export default Cart;
