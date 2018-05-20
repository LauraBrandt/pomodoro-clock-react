import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import TimeDisplay from './TimeDisplay';

it('renders without crashing', () => {
  shallow(<TimeDisplay />);
});

describe('structure', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<TimeDisplay type="Session" time="25:00"/>);
  });
  
  it('has all elements with ids necessary', () => {
    expect(wrapper.find('#timer-label')).toHaveLength(1);
    expect(wrapper.find('#time-left')).toHaveLength(1);
  });
  
  it('gets type prop and renders it correctly', () => {
    expect(wrapper.props().type).toEqual('Session');
    expect(wrapper.find('#timer-label').text()).toEqual('Session');
  });

  it('sets the time correctly', () => {
    const time = wrapper.find('#time-left').text();
    expect(time).toEqual("25:00");
  });

  it('has the correct time format (mm:ss)', () => {
    const time = wrapper.find('#time-left').text();
    expect(time).toMatch(/\d{2}:\d{2}/)
  });
});

describe('snapshot', () => {
  it.skip('renders', () => {
    const component = renderer.create(<TimeDisplay />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
