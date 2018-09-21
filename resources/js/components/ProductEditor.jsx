import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductEditor extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.props.canSubmit) {
      const { product, onAdd, onEdit, isEdit } = this.props;
      const submitMethod = isEdit ? onEdit : onAdd;
      submitMethod(product);
    }
  }

  render() {
    const { product, handleInput, handleChecked,
      canSubmit, isEdit } = this.props;
    const title = isEdit ? 'Edit' : 'Add New';
    return (
      <div>
        <h2>
          { `${title} Product`}
        </h2>
        <div>

          <form id="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">
Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={product.title || ''}
                aria-describedby="titleHelp"
                placeholder="Enter product title"
                onChange={handleInput}
                required
              />
              <small
                id="titleHelp"
                className="form-text text-muted"
              >
Enter a brief title for the product.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={product.description || ''}
                placeholder="Description"
                onChange={handleInput}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={Number(product.price) || ''}
                aria-describedby="priceHelp"
                placeholder="Enter product price"
                onChange={handleInput}
                required
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="availability"
                name="availability"
                checked={Boolean(product.availability) || false}
                onChange={handleChecked}
              />
              <label
                className="form-check-label"
                htmlFor="availability"
              >
Availabile

              </label>
            </div>
            <button
              type="submit"
              id="submit"
              className="btn btn-primary"
              disabled={!canSubmit}
            >
Submit

            </button>
          </form>

        </div>
      </div>);
  }
}

ProductEditor.defaultProps = {
  product: {},
  canSubmit: false,
  isEdit: false,
};

ProductEditor.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleChecked: PropTypes.func.isRequired,
  canSubmit: PropTypes.bool,
  isEdit: PropTypes.bool,
  product: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number
    ]),
    availability: PropTypes.number,
  })
};
export default ProductEditor;
