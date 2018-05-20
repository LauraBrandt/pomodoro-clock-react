import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import TimeSetting from '../Components/TimeSetting';

it('renders without crashing', () => {
  shallow(<TimeSetting />);
});

describe('structure', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<TimeSetting type="Session" length={25}/>);
  });
  
  it('has all elements with ids necessary', () => {
    expect(wrapper.find('#session-label')).toHaveLength(1);
    expect(wrapper.find('#session-decrement')).toHaveLength(1);
    expect(wrapper.find('#session-length')).toHaveLength(1);
    expect(wrapper.find('#session-increment')).toHaveLength(1);
    expect(wrapper.find('.fa-minus')).toHaveLength(1);
    expect(wrapper.find('.fa-plus')).toHaveLength(1);
  });
  
  it('gets type prop and renders it correctly', () => {
    expect(wrapper.props().type).toEqual('Session');
    expect(wrapper.text()).toEqual('Session Length');
  });

  it('sets the default session time correctly', () => {
    const value = wrapper.find('#session-length').instance().value;
    expect(value).toEqual("25");
  });

  it('sets the default break time correctly', () => {
    wrapper =  mount(<TimeSetting type="Break" length={5}/>);
    const value = wrapper.find('#break-length').instance().value;
    expect(value).toEqual("5");
  });
});

describe('snapshot', () => {
  it.skip('renders', () => {
    const component = renderer.create(<TimeSetting type="Session"/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
