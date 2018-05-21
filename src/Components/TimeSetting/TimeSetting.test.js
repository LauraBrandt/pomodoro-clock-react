import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import TimeSetting from './TimeSetting';

it('renders without crashing', () => {
  shallow(<TimeSetting type="" length={25} handleChangeByOne={jest.fn()} handleChange={jest.fn()} />);
});

describe('structure', () => {
  let wrapper = mount(<TimeSetting type="Session" length={25} handleChangeByOne={jest.fn()} handleChange={jest.fn()} />);
  
  it('has all elements with ids necessary', () => {
    expect(wrapper.find('#session-label')).toHaveLength(1);
    expect(wrapper.find('#session-decrement')).toHaveLength(1);
    expect(wrapper.find('#session-length')).toHaveLength(1);
    expect(wrapper.find('#session-increment')).toHaveLength(1);
    expect(wrapper.find('.fa-minus')).toHaveLength(1);
    expect(wrapper.find('.fa-plus')).toHaveLength(1);
  });
  
  it('sets the label correctly', () => {
    expect(wrapper.find('#session-label').text()).toEqual('Session Length');
  });
  
  it('sets the default session time correctly', () => {
    const value = wrapper.find('#session-length').instance().value;
    expect(value).toEqual("25");
  });
  
  it('sets the default break time correctly', () => {
    wrapper.setProps({type: "break", length: 5});
    const value = wrapper.find('#break-length').instance().value;
    expect(value).toEqual("5");
  });
});

describe('event listeners', () => {
  let wrapper, mockHandleChange, mockHandleChangeByOne;
  beforeEach(() => {
    mockHandleChange = jest.fn();
    mockHandleChangeByOne = jest.fn();
    wrapper = shallow(<TimeSetting type="Session" length={25} handleChangeByOne={mockHandleChangeByOne} handleChange={mockHandleChange} />);
  });

  it('the function handleChange is called when the input is changed', () => {
    wrapper.find('#session-length').simulate('change');
    expect(mockHandleChange).toBeCalled();
  });
  
  it('the function handleChange is called when the input is blurred', () => {
    wrapper.find('#session-length').simulate('blur');
    expect(mockHandleChange).toBeCalled();
  });

  it('the function handleChangeByOne is called (with correct args) when the increment button is clicked', () => {
    wrapper.find('#session-increment').simulate('click');
    expect(mockHandleChangeByOne.mock.calls[0][0]).toBe('Session');
    expect(mockHandleChangeByOne.mock.calls[0][1]).toBe(1);
  });
  
  it('the function handleChangeByOne is called (with correct args) when the decrement button is clicked', () => {
    wrapper.find('#session-decrement').simulate('click');
    expect(mockHandleChangeByOne.mock.calls[0][0]).toBe('Session');
    expect(mockHandleChangeByOne.mock.calls[0][1]).toBe(-1);
  });
});

describe('snapshot', () => {
  it('renders', () => {
    const component = renderer.create(<TimeSetting type="Session" length={25} handleChangeByOne={jest.fn()} handleChange={jest.fn()} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
