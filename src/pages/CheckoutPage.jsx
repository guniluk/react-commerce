import { Link } from 'react-router';
import './CheckoutPage.css';
import { formatMoney } from '../utils/money';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CheckoutPage = ({ cart }) => {
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });

  const [DeliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
    axios
      .get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then((response) => {
        setDeliveryOptions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get('/api/payment-summary')
      .then((response) => {
        setPaymentSummary(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
          <div className="order-summary">
            {DeliveryOptions.length > 0 &&
              cart.map((cartItem) => {
                const selectedDeliveryOption = DeliveryOptions.find(
                  (option) => option.id === cartItem.deliveryOptionId,
                );

                return (
                  <div className="cart-item-container" key={cartItem.productId}>
                    <div className="delivery-date">
                      Delivery date:{' '}
                      {selectedDeliveryOption
                        ? dayjs(
                            selectedDeliveryOption.estimatedDeliveryTimeMs,
                          ).format('dddd, MMMM D')
                        : ''}
                    </div>

                    <div className="cart-item-details-grid">
                      <img
                        className="product-image"
                        src={cartItem.product.image}
                      />

                      <div className="cart-item-details">
                        <div className="product-name">
                          {cartItem.product.name}
                        </div>
                        <div className="product-price">
                          {/* ${(cartItem.product.priceCents / 100).toFixed(2)} */}
                          {formatMoney(cartItem.product.priceCents)}
                        </div>
                        <div className="product-quantity">
                          <span>
                            Quantity:{' '}
                            <span className="quantity-label">
                              {cartItem.quantity}
                            </span>
                          </span>
                          <span className="update-quantity-link link-primary">
                            Update
                          </span>
                          <span className="delete-quantity-link link-primary">
                            Delete
                          </span>
                        </div>
                      </div>

                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>
                        {DeliveryOptions.map((option) => {
                          let priceString = 'Free Shipping';
                          if (option.priceCents > 0) {
                            priceString = `${formatMoney(option.priceCents)} - Shipping`;
                          }

                          return (
                            <div className="delivery-option" key={option.id}>
                              <input
                                type="radio"
                                checked={
                                  option.id === cartItem.deliveryOptionId
                                }
                                className="delivery-option-input"
                                name={`delivery-option-${cartItem.productId}`}
                              />
                              <div>
                                <div className="delivery-option-date">
                                  {dayjs(option.estimatedDeliveryTimeMs).format(
                                    'dddd, MMMM D',
                                  )}
                                </div>
                                <div className="delivery-option-price">
                                  {priceString}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>
            {paymentSummary && (
              <>
                <div className="payment-summary-row">
                  <div>Items ({paymentSummary?.totalItems || 0}):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary?.productCostCents || 0)}
                  </div>
                </div>
                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary?.shippingCostCents || 0)}
                  </div>
                </div>
                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary?.totalCostBeforeTaxCents || 0)}
                  </div>
                </div>
                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary?.taxCents || 0)}
                  </div>
                </div>
                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary?.totalCostCents || 0)}
                  </div>
                </div>
                <button className="place-order-button button-primary">
                  Place your order
                </button>{' '}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
