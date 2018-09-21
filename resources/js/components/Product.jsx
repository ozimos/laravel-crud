import React from 'react';
import PropTypes from 'prop-types';

const Product = ({ product }) => (
  product.title
    ? (
      <div>
        <h2> {product.title} </h2>
        <h4> {product.description} </h4>
        <h3>
          Status : {product.availability ? 'Available' : 'Out of stock'}
        </h3>
        <h3> Price : {product.price} </h3>
      </div>
    )
    : <div>  Product Doesn&#39;t exist </div>
);
Product.defaultProps = {
  product: {
    title: '',
    description: '',
    price: 0,
    availability: false
  }
};

Product.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    availability: PropTypes.number,
  })
};

export default Product;
