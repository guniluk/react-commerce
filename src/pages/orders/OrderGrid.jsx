import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import OrderDetail from './OrderDetail';

export default function OrderGrid({ orders }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => (
        <div className="order-container" key={order.id}>
          <div className="order-header">
            <div className="order-header-left-section">
              <div className="order-date">
                <div className="order-header-label">Order Placed:</div>
                <div>{dayjs(order.orderTimeMs).format('dddd, MMMM D')}</div>
              </div>
              <div className="order-total">
                <div className="order-header-label">Total:</div>
                <div>{formatMoney(order.totalCostCents)}</div>
              </div>
            </div>

            <div className="order-header-right-section">
              <div className="order-header-label">Order ID:</div>
              <div>{order.id}</div>
            </div>
          </div>

          <OrderDetail order={order} />
        </div>
      ))}
    </div>
  );
}
