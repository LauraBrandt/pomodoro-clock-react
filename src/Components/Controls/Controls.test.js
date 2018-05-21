import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import Controls from './Controls';

it('renders without crashing', () => {
  shallow(<Controls isRunning={false} reset={jest.fn()} handleStartStop={jest.fn()}/>);
});

describe('structure', () => {
  it('has all elements with ids necessary', () => {
    const wrapper = shallow(<Controls isRunning={false} reset={jest.fn()} handleStartStop={jest.fn()}/>);
    expect(wrapper.find('#start_stop')).toHaveLength(1);
    expect(wrapper.find('#reset')).toHaveLength(1);
    expect(wrapper.find('.fa-sync-alt')).toHaveLength(1);
  });

  it('sets titles and classes correctly based on isRunning prop', () => {
    const wrapper = shallow(<Controls isRunning={false} reset={jest.fn()} handleStartStop={jest.fn()}/>);

    expect(wrapper.find('.fa-pause')).toHaveLength(0);
    expect(wrapper.find('.fa-play')).toHaveLength(1);
    expect(wrapper.find('#start_stop').filter("[title='Start']")).toHaveLength(1);
    expect(wrapper.find('.fas').filter("[title='Start']")).toHaveLength(1);
    
    wrapper.setProps({ isRunning : true });
    
    expect(wrapper.find('.fa-pause')).toHaveLength(1);
    expect(wrapper.find('.fa-play')).toHaveLength(0);
    expect(wrapper.find('#start_stop').filter("[title='Stop']")).toHaveLength(1);
    expect(wrapper.find('.fas').filter("[title='Stop']")).toHaveLength(1);
  });
});

describe('click events', () => {
  it('calls handleStartStop when start_stop button clicked', () => {
    const mockHandleStartStop = jest.fn();
    const wrapper = shallow(<Controls isRunning={false} reset={jest.fn()} handleStartStop={mockHandleStartStop}/>);
    wrapper.find('#start_stop').simulate('click');
    expect(mockHandleStartStop).toBeCalled();
  });

  it('calls reset when reset button clicked', () => {
    const mockReset = jest.fn();
    const wrapper = shallow(<Controls isRunning={false} reset={mockReset} handleStartStop={jest.fn()}/>);
    wrapper.find('#reset').simulate('click');
    expect(mockReset).toBeCalled();
  });
});

describe('snapshot', () => {
  it('renders', () => {
    const component = renderer.create(<Controls isRunning={false} reset={jest.fn()} handleStartStop={jest.fn()}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});