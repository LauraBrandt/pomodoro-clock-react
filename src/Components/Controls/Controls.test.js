import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import Controls from './Controls';

const props = {
  isRunning: false,
  reset: jest.fn(),
  handleStartStop: jest.fn(),
  isMuted: false,
  handleMute: jest.fn()
}

it('renders without crashing', () => {
  shallow(<Controls {...props}/>);
});

describe('structure', () => {
  it('has all elements with ids necessary', () => {
    const wrapper = shallow(<Controls {...props}/>);
    expect(wrapper.find('#start_stop')).toHaveLength(1);
    expect(wrapper.find('#reset')).toHaveLength(1);
    expect(wrapper.find('.fa-sync-alt')).toHaveLength(1);
    expect(wrapper.find('#mute')).toHaveLength(1);
  });

  it('sets titles and classes correctly based on isRunning prop', () => {
    const wrapper = shallow(<Controls {...props}/>);

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

  it('sets titles and classes correctly based on isMuted prop', () => {
    const wrapper = shallow(<Controls {...props}/>);

    expect(wrapper.find('.fa-volume-off')).toHaveLength(0);
    expect(wrapper.find('.fa-volume-up')).toHaveLength(1);
    expect(wrapper.find('#mute').filter("[title='Mute']")).toHaveLength(1);
    expect(wrapper.find('.fas').filter("[title='Mute']")).toHaveLength(1);
    
    wrapper.setProps({ isMuted : true });
    
    expect(wrapper.find('.fa-volume-off')).toHaveLength(1);
    expect(wrapper.find('.fa-volume-up')).toHaveLength(0);
    expect(wrapper.find('#mute').filter("[title='Unmute']")).toHaveLength(1);
    expect(wrapper.find('.fas').filter("[title='Unmute']")).toHaveLength(1);
  });
});

describe('click events', () => {
  it('calls handleStartStop when start_stop button clicked', () => {
    const mockHandleStartStop = jest.fn();
    const wrapper = shallow(<Controls {...props} handleStartStop={mockHandleStartStop}/>);
    wrapper.find('#start_stop').simulate('click');
    expect(mockHandleStartStop).toBeCalled();
  });

  it('calls reset when reset button clicked', () => {
    const mockReset = jest.fn();
    const wrapper = shallow(<Controls {...props} reset={mockReset} />);
    wrapper.find('#reset').simulate('click');
    expect(mockReset).toBeCalled();
  });

  it('calls handleMute when mute button clicked', () => {
    const mockMute = jest.fn();
    const wrapper = shallow(<Controls {...props} handleMute={mockMute} />);
    wrapper.find('#mute').simulate('click');
    expect(mockMute).toBeCalled();
  });
});

describe('snapshot', () => {
  it('renders', () => {
    const component = renderer.create(<Controls {...props}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});