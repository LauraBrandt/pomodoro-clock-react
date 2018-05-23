import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import TimeDisplay, {formatTime} from './TimeDisplay';

it('renders without crashing', () => {
  shallow(<TimeDisplay type="" time="" handleStartStop={jest.fn()}/>);
});

describe('structure', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<TimeDisplay type="Session" time={25*60} handleStartStop={jest.fn()}/>);
  });
  
  it('has all elements with ids necessary', () => {
    expect(wrapper.find('#timer-label')).toHaveLength(1);
    expect(wrapper.find('#time-left')).toHaveLength(1);
  });
  
  it('sets the label correctly', () => {
    expect(wrapper.find('#timer-label').text()).toEqual('Session');
  });

  it('sets the time correctly', () => {
    expect(wrapper.find('#time-left').text()).toEqual("25:00");
  });

  it('has the correct time format (mm:ss)', () => {
    const time = wrapper.find('#time-left').text();
    expect(time).toMatch(/\d+:\d{2}/)
  });
});

describe('formatTime', () => {
  it('calculates and formats the display time correctly', () => {
    const timeString = formatTime(1000);
    expect(timeString).toBe('16:40');
  });

  it('zero-pads seconds', () => {
    const timeString = formatTime(608);
    expect(timeString).toMatch(/\d+:\d{2}/);
    expect(timeString).toBe('10:08');
  });

  it("doesn't zero-pad minutes", () => {
    const timeString = formatTime(500);
    expect(timeString).toMatch(/\d{1}:\d{2}/);
    expect(timeString).toBe('8:20');
  });
});

describe('last-ten-seconds', () => {
  it('adds class to turn red in last 10 seconds', () => {
    const wrapper = shallow(<TimeDisplay type="Session" time={10} handleStartStop={jest.fn()}/>);
    expect(wrapper.find('.last-ten-seconds')).toHaveLength(2);
    wrapper.setProps({ time: 0 });
    expect(wrapper.find('.last-ten-seconds')).toHaveLength(2);
  });

  it('removes last-ten-seconds class when time > 10', () => {
    const wrapper = shallow(<TimeDisplay type="Session" time={11} handleStartStop={jest.fn()}/>);
    expect(wrapper.find('.last-ten-seconds')).toHaveLength(0);
  });
});

describe('blink', () => {
  it('adds blink class correctly', () => {
    const wrapper = shallow(<TimeDisplay type="Session" time={10} handleStartStop={jest.fn()} blink={true}/>);
    expect(wrapper.find('.blink')).toHaveLength(3);
    wrapper.setProps({ blink: false });
    expect(wrapper.find('.blink')).toHaveLength(0);
  });
});

describe('handleStartStop', () => {
  it('calls handleStartStop on click of TimeDisplay', () => {
    const mockHandleStartStop = jest.fn();
    const wrapper = shallow(<TimeDisplay type="" time="" handleStartStop={mockHandleStartStop}/>);
    
    expect(mockHandleStartStop).not.toBeCalled();
    wrapper.simulate('click');
    expect(mockHandleStartStop).toBeCalled();
  });
});

describe('snapshot', () => {
  it('renders', () => {
    const component = renderer.create(<TimeDisplay type="Session" time={488} handleStartStop={jest.fn()}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
