/* global React:false shallow:false toJson:false */

import Product from '../../components/Product';

import { displayedProduct }
  from '../__mocks__/productsMock';

describe('Product Component', () => {
  const props = {
    product: displayedProduct
  };
  const shallowSetup = () => shallow(<Product {...props} />);

  it('renders correctly', () => {
    const wrapper = shallowSetup();
    expect(toJson(wrapper)).toMatchSnapshot();

    expect(toJson(shallow(<Product />))).toMatchSnapshot();

    const outOfStockProduct = {
      ...displayedProduct,
      availability: 0
    };
    expect(toJson(shallow(<Product product={outOfStockProduct} />)))
      .toMatchSnapshot();

  });
});
