import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import { showNotification } from './store/ui-slice';
import Notification from './components/UI/Notification';
import { replaceCart } from './store/cart-slice';

let isInitial = true;

function App() {
  const isVisible = useSelector((state) => state.ui.isVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  //* Fetching Cart Data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-httprequest-c9392-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json'
      );

      if (!response.ok) {
       throw new Error('Something Went Wrong.')
      }

      const jsonData = await response.json();
      
      return jsonData;
    };

    fetchData()
      .then((cartData) =>
        dispatch(
          replaceCart({
            items: cartData.items || [],
            totalQuantity: cartData.totalQuantity || 0,
            totalAmount: cartData.totalAmount || 0,
          })
        )
      )
      .catch(() => {
        dispatch(
          showNotification({
            status: 'error',
            title: 'Error',
            message: 'Something went wrong.',
          })
        );
      });
  }, [dispatch]);

  //* Sending Cart Data
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        showNotification({
          status: 'pending',
          title: 'Sending . . .',
          message: 'Sending Cart Data.',
        })
      );

      const response = await fetch(
        'https://react-httprequest-c9392-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        dispatch(
          showNotification({
            status: 'error',
            title: 'Error',
            message: 'Sending Cart Data Fail.',
          })
        );
      }

      dispatch(
        showNotification({
          status: 'success',
          title: 'Success',
          message: 'Sending Cart Data Success.',
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

     if(cart.change){
      sendCartData().catch((error) => {
        dispatch(
          showNotification({
            status: 'error',
            title: 'Error',
            message: 'Sending Cart Data Fail.',
          })
        );
      });
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

export default App;
