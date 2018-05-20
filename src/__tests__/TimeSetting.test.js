import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import TimeSetting from '../Components/TimeSetting';

it('renders without crashing', () => {
  shallow(<TimeSetting />);
});

it('sets type prop and renders it correctly', () => {
  const wrapper = mount(<TimeSetting type="Work" />);
  expect(wrapper.props().type).toEqual('Work');
  expect(wrapper.text()).toEqual('Work Time');
});

describe('snapshot', () => {
  it.skip('renders', () => {
    const component = renderer.create(<TimeSetting type="Work"/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
});
