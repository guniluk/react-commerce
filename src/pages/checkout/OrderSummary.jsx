import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import { DeliveryOptions } from './DeliveryOptions';

const OrderSummary = ({ cart, deliveryOptions }) => {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
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
                <img className="product-image" src={cartItem.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>
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

                <DeliveryOptions
                  cartItem={cartItem}
                  deliveryOptions={deliveryOptions}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default OrderSummary;
