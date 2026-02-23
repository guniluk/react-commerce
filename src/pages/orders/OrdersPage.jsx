import Header from '../../components/Header';
import './OrdersPage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import OrderGrid from './OrderGrid';

const OrdersPage = ({ cart }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // axios
    axios
      .get('/api/orders?expand=products')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrderGrid orders={orders} />
      </div>
    </>
  );
};

export default OrdersPage;
