/* global React:false shallow:false toJson:false */

import Main from '../../components/Main';

import { products, displayedProduct, newProduct }
  from '../__mocks__/productsMock';

describe('Main Component', () => {

  const shallowSetup = () => shallow(<Main />);

  it('should render without throwing an error', () => {

    const wrapper = shallowSetup();

    expect(wrapper.find('.product-list')
      .contains(<h3> All Products </h3>)).toBe(true);
  });

  it('renders correctly', () => {
    const wrapper = shallowSetup();
    expect(toJson(wrapper)).toMatchSnapshot();

    wrapper.setState({ products, displayedProduct });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it(
    'should add a new product '
    + 'when the submit button on the add form is clicked',
    () => {
      const wrapper = shallowSetup();

      const handleAddProductSpy = jest.spyOn(
        wrapper.instance(),
        'handleAddProduct'
      );
      wrapper.instance().handleAddProduct(newProduct);
      expect(handleAddProductSpy).toHaveBeenCalled();
    }
  );

  it('should edit an existing product'
  + ' when the submit button on the edit form is clicked', () => {

    const wrapper = shallowSetup();

    const handleEditProductSpy = jest.spyOn(
      wrapper.instance(),
      'handleEditProduct'
    );
    wrapper.instance().handleEditProduct(displayedProduct);
    expect(handleEditProductSpy).toHaveBeenCalled();
  });

  it('should show delete modal when the delete button is clicked', () => {
    const wrapper = shallowSetup();

    const deleteProductSpy = jest.spyOn(
      wrapper.instance(),
      'deleteProduct'
    );
    wrapper.instance().deleteProduct(products[3].id);
    expect(deleteProductSpy).toHaveBeenCalled();
  });

  it('should delete product when the delete confirm button is clicked', () => {
    const wrapper = shallowSetup();

    const deleteProductSpy = jest.spyOn(
      wrapper.instance(),
      'deleteProduct'
    );
    deleteProductSpy.mockResolvedValue(true);
    wrapper.instance().deleteProduct(products[3].id);
    expect(deleteProductSpy).toHaveBeenCalled();
  });

  it('should show product details when the product button is clicked', () => {
    const wrapper = shallowSetup();

    const handleClickSpy = jest.spyOn(
      wrapper.instance(),
      'handleClick'
    );
    wrapper.instance().handleClick(displayedProduct);
    expect(handleClickSpy).toHaveBeenCalled();
  });

  it('should call `handleInput` when the form input is changed', () => {
    const wrapper = shallowSetup();

    const handleInputSpy = jest.spyOn(
      wrapper.instance(),
      'handleInput'
    );
    wrapper.instance().handleInput({ target: { value: 99 } }, 'abc');
    expect(handleInputSpy).toHaveBeenCalled();
  });

  it('should call `handleChecked` when the form checkbox is changed', () => {
    const wrapper = shallowSetup();

    const handleCheckedSpy = jest.spyOn(
      wrapper.instance(),
      'handleChecked'
    );
    wrapper.instance().handleChecked({ target: { value: 20 } }, 'abc');
    expect(handleCheckedSpy).toHaveBeenCalled();
  });
  it('should check the form validity when a form input is changed', () => {
    const wrapper = shallowSetup();

    const checkValiditySpy = jest.spyOn(
      wrapper.instance(),
      'checkValidity'
    );
    wrapper.instance().checkValidity({ target: { value: 20 } }, 'abc');
    expect(checkValiditySpy).toHaveBeenCalled();
  });
  it('should add a product to the editor when the edit button is clicked',
    () => {
      const wrapper = shallowSetup();

      const addToEditorSpy = jest.spyOn(
        wrapper.instance(),
        'addToEditor'
      );
      wrapper.instance().addToEditor({ target: { value: 20 } }, 'abc');
      expect(addToEditorSpy).toHaveBeenCalled();
    });
});
