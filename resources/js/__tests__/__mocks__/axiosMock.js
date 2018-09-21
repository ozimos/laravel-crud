// __mocks__/request.js
import { products, displayedProduct } from './productsMock';


export default {
  get: jest.fn(() => Promise.resolve({ data: products })),
  post: jest.fn(() => Promise.resolve({ data: displayedProduct })),
  put: jest.fn(() => Promise.resolve({ data: displayedProduct })),
  delete: jest.fn(() => Promise.resolve(null)),
};
