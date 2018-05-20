import React from 'react';
import {shallow, mount} from 'enzyme';
// import renderer from 'react-test-renderer';
import Controls from './Controls';

it('renders without crashing', () => {
  shallow(<Controls />);
});

describe('structure', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<Controls />);
  });
  
  it('has all elements with ids necessary', () => {
    expect(wrapper.find('#start_stop')).toHaveLength(1);
    expect(wrapper.find('#reset')).toHaveLength(1);
    expect(wrapper.find('.fa-play')).toHaveLength(1);
    expect(wrapper.find('.fa-sync-alt')).toHaveLength(1);
  });
});

describe('snapshot', () => {
  it.skip('renders', () => {
    const component = renderer.create(<Controls />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});