import { replaceCart } from './cart-slice';
import { showNotification } from './ui-slice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-httprequest-c9392-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong.');
      }

      const jsonData = await response.json();

      return jsonData;
    };

    try {
      const cartData = await fetchData();

      dispatch(
        replaceCart({
          items: cartData.items || [],
          totalAmount: cartData.totalAmount || 0,
          totalQuantity: cartData.totalQuantity || 0,
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          status: 'error',
          title: 'Error',
          message: error.message,
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: 'pending',
        title: 'Sending . . .',
        message: 'Sending Cart Data.',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://react-httprequest-c9392-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong.');
      }
    };

    try {
      await sendRequest();

      dispatch(
        showNotification({
          status: 'success',
          title: 'Success',
          message: 'Sending Cart Data Success.',
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          status: 'error',
          title: 'Error',
          message: error.message,
        })
      );
    }
  };
};
