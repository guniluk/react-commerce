import { Link } from 'react-router';
import './CheckoutPage.css';

import { useState, useEffect } from 'react';
import axios from 'axios';
import OrderSummary from './OrderSummary';
import PaymentSummary from './PaymentSummary';

const CheckoutPage = ({ cart }) => {
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });

  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
    // axios
    //   .get('/api/delivery-options?expand=estimatedDeliveryTime')
    //   .then((response) => {
    //     setDeliveryOptions(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    const fetchDeliveryOptions = async () => {
      try {
        const response = await axios.get(
          '/api/delivery-options?expand=estimatedDeliveryTime',
        );
        setDeliveryOptions(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeliveryOptions();

    //   axios
    //     .get('/api/payment-summary')
    //     .then((response) => {
    //       setPaymentSummary(response.data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }, []);

    const fetchPaymentSummary = async () => {
      try {
        const response = await axios.get('/api/payment-summary');
        setPaymentSummary(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPaymentSummary();
  }, []);

  return (
    <>
      <title>Checkout</title>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              {totalQuantity} items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
