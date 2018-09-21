/* eslint import/no-extraneous-dependencies: off */
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import axios from './__mocks__/axiosMock';

configure({ adapter: new Adapter() });

global.React = React;
global.shallow = shallow;
global.mount = mount;
global.toJson = toJson;
window.axios = axios;
