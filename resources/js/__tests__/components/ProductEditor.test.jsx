/* global React:false shallow:false toJson:false */

import ProductEditor from '../../components/ProductEditor';

import { displayedProduct, newProduct }
  from '../__mocks__/productsMock';

describe('ProductEditor Component', () => {
  const props = {
    onAdd: jest.fn(),
    onEdit: jest.fn(),
    handleInput: jest.fn(),
    handleChecked: jest.fn(),
    canSubmit: true,
    isEdit: false,
    product: newProduct
  };
  const shallowSetup = () => shallow(<ProductEditor {...props} />);
  const event = {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn()
  };
  it('should render without throwing an error', () => {

    const wrapper = shallowSetup();

    expect(wrapper.find('#form')
      .contains(
        <small
          id="titleHelp"
          className="form-text text-muted"
        >
          Enter a brief title for the product.
        </small>
      ))
      .toBe(true);
  });

  it('renders correctly', () => {
    let wrapper = shallowSetup();
    expect(toJson(wrapper)).toMatchSnapshot();

    const propsWhenEditing = {
      ...props,
      isEdit: true,
      product: displayedProduct };
    wrapper = shallow(<ProductEditor {...propsWhenEditing} />);
    expect(toJson(wrapper)).toMatchSnapshot();

    const propsWhenProductEmpty = {
      ...props,
      canSubmit: false,
      product: {} };
    wrapper = shallow(<ProductEditor {...propsWhenProductEmpty} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it(
    'should add a new product '
    + 'when the submit button on the add form is clicked',
    () => {
      const wrapper = shallowSetup();

      const handleSubmitSpy = jest.spyOn(
        wrapper.instance(),
        'handleSubmit'
      );
      wrapper.instance().handleSubmit(event);
      expect(handleSubmitSpy).toHaveBeenCalled();
    }
  );

  it(
    'should edit a  product '
    + 'when the submit button on the edit form is clicked',
    () => {
      const propsWhenEditing = {
        ...props,
        isEdit: true,
        product: displayedProduct };
      const wrapper = shallow(<ProductEditor {...propsWhenEditing} />);
      const handleSubmitSpy = jest.spyOn(
        wrapper.instance(),
        'handleSubmit'
      );
      wrapper.instance().handleSubmit(event);
      expect(handleSubmitSpy).toHaveBeenCalled();
    }
  );
});
