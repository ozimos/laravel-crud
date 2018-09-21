/* global axios:false */
import React, { Component } from 'react';
import swal from 'sweetalert';
import Product from './Product.jsx';
import ProductEditor from './ProductEditor.jsx';

class Main extends Component {

  constructor() {

    super();
    this.state = {
      products: [],
      displayedProduct: {},
      editorProduct: {},
      canSubmit: false,
      isEdit: false
    };
    this.handleAddProduct = this.handleAddProduct.bind(this);
    this.handleEditProduct = this.handleEditProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
    this.addToEditor = this.addToEditor.bind(this);
  }

  componentDidMount() {
    axios.get('/api/products')
      .then((response) => {
        const products = response.data;
        this.setState({ products, displayedProduct: products[0] });
      });
  }

  handleClick(product) {
    this.setState({ displayedProduct: product });

  }

  handleInput(event) {
    const { editorProduct } = this.state;
    this.setState({
      editorProduct: {
        ...editorProduct,
        [event.target.name]: event.target.value
      },
      canSubmit: this.checkValidity()
    });
  }

  handleChecked(event) {
    const checked = event.target.checked ? 1 : 0;
    const { editorProduct } = this.state;
    this.setState({
      editorProduct: { ...editorProduct, availability: checked }
    });
  }

  checkValidity() {
    const { title, description, price } = this.state.editorProduct;
    return title && description && price;
  }

  addToEditor(product) {
    this.setState({ editorProduct: product, isEdit: true });
  }

  deleteProduct(id) {
    swal({
      title: 'Delete Product',
      text: 'Are you sure you want to delete this product',
      icon: 'warning',
      buttons: [true, 'Delete'],
      dangerMode: true
    })
      .then(() => {
        axios.delete(`api/products/${id}`)
          .then(() => {
            this.setState(prevState => ({
              products: prevState.products
                .filter(product => (product.id !== id)),
            }));
          });
      });
  }

  handleAddProduct(product) {
    product.price = Number(product.price);
    axios.post('api/products/', product, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        const savedProduct = response.data;
        this.setState(prevState => ({
          products: [savedProduct, ...prevState.products],
          displayedProduct: savedProduct,
          editorProduct: {}
        }));
      });

  }

  handleEditProduct(product) {
    product.price = Number(product.price);
    axios.put(`api/products/${product.id}`, product, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        const savedProduct = response.data;
        this.setState(prevState => ({
          products: prevState.products
            .map(productsItem => (productsItem.id === savedProduct.id
              ? savedProduct : productsItem)),
          displayedProduct: savedProduct,
          editorProduct: {},
          isEdit: false
        }));
      });

  }

  renderProducts() {
    return this.state.products.map(product => (
      <div
        className="flexible"
        key={product.id}
      >
        <button
          onClick={() => this.handleClick(product)}
          type="button"
          className="list-group-item list-group-item-action"
          style={{ width: '80%', borderRight: 'none' }}
        >
          { product.title }
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action close"
          style={{ width: '10%', color: 'green' }}
          onClick={() => this.addToEditor(product)}
        >
         &#9999;
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action close"
          style={{ width: '10%', color: 'red' }}
          onClick={() => this.deleteProduct(product.id)}
        >
        &#10006;
        </button>
      </div>
    ));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4 product-list">
            <h3> All Products </h3>
            <div className="list-group">
              { this.renderProducts() }
            </div>
          </div>
          <div className="col-8">
            <Product product={this.state.displayedProduct} />
            <hr />
            <ProductEditor
              onAdd={this.handleAddProduct}
              onEdit={this.handleEditProduct}
              product={this.state.editorProduct}
              isEdit={this.state.isEdit}
              handleInput={this.handleInput}
              handleChecked={this.handleChecked}
              canSubmit={Boolean(this.state.canSubmit)}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default Main;
