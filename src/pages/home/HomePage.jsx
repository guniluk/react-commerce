import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
// import { products } from '../assets/data/products';
import './HomePage.css';
import ProductsGrid from './ProductsGrid';

const HomePage = ({ cart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //   axios
    //     .get('/api/products')
    //     .then((response) => {
    //       //response.json() in fetch, but in axios response.data
    //       setProducts(response.data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }, [])

    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <title>Home</title>
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
};

export default HomePage;
