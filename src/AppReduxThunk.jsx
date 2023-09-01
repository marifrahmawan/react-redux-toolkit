import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';

let isInitial = true;

function AppReduxThunk() {
  const isVisible = useSelector((state) => state.ui.isVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  //* Fetching Cart Data
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  //* Sending Cart Data
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.change) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification status={notification.status} title={notification.title} message={notification.message} />
      )}
      <Layout>
        {isVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default AppReduxThunk;
