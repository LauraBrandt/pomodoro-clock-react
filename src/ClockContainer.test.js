import React from 'react';
import {shallow, mount} from 'enzyme';
// import renderer from 'react-test-renderer';
import ClockContainer from './ClockContainer';
import TimeSetting from './Components/TimeSetting/TimeSetting';
import TimeDisplay from './Components/TimeDisplay/TimeDisplay';
import Controls from './Components/Controls/Controls';

describe('initial rendering', () => {
  it('renders without crashing', () => {
    shallow(<ClockContainer />);
  });
  
  it('contains the correct child components', () => {
    const wrapper = shallow(<ClockContainer />);
    expect(wrapper.find(TimeSetting)).toHaveLength(2);
    expect(wrapper.find(TimeDisplay)).toHaveLength(1);
    expect(wrapper.find(Controls)).toHaveLength(1);
    expect(wrapper.find('header')).toHaveLength(1);
    expect(wrapper.find('footer')).toHaveLength(1);
  });
  
  it('passes the correct initial props to TimeSetting components', () => {
    const wrapper = shallow(<ClockContainer />);
    const timeSettings = wrapper.find(TimeSetting);
    expect(timeSettings.at(0).props().type).toEqual('Session');
    expect(timeSettings.at(0).props().length).toEqual(25);
    expect(timeSettings.at(1).props().type).toEqual('Break');
    expect(timeSettings.at(1).props().length).toEqual(5);
  });
  
  it('passes the correct initial props to TimeDisplay component', () => {
    const wrapper = shallow(<ClockContainer />);
    const timeDisplayWrapper = wrapper.find(TimeDisplay);
    expect(timeDisplayWrapper.at(0).props().type).toEqual('Session');
    expect(timeDisplayWrapper.at(0).props().time).toEqual(wrapper.state().sessionLength*60);
  });
});

describe('change break and session lengths', () => {
  it('increments the length by one on button click and passes the new value', () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({sessionLength: 5});
    const sessionIncrementButton = wrapper.find('#session-increment').simulate('click');
    expect(wrapper.state().sessionLength).toBe(6);
    expect(wrapper.find(TimeSetting).at(0).props().length).toBe(6);
  });
  
  it('decrements the length by one on button click and passes the new value', () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({sessionLength: 5});
    const sessionDecrementButton = wrapper.find('#session-decrement').simulate('click');
    expect(wrapper.state().sessionLength).toBe(4);
    expect(wrapper.find(TimeSetting).at(0).props().length).toBe(4);
  });

  it("can't go above 60 on button click and keeps the old value", () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({sessionLength: 60});
    const sessionIncrementButton = wrapper.find('#session-increment').simulate('click');
    expect(wrapper.state().sessionLength).toBe(60);
  });

  it("can't go below 1 on button click and keeps the old value", () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({sessionLength: 1});
    const sessionDecrementButton = wrapper.find('#session-decrement').simulate('click');
    expect(wrapper.state().sessionLength).toBe(1);
  });

  it('changes when the input is modified', () => {
    const wrapper = mount(<ClockContainer />);
    const event = {
      target: {
        id: 'session-length',
        value: 20
      }
    }
    const sessionDecrementButton = wrapper.find('#session-length').simulate('change', event);
    expect(wrapper.state().sessionLength).toBe(20);
    expect(wrapper.find(TimeSetting).at(0).props().length).toBe(20);
  });

  it('sets the length to 1 if the length is less than one when the input is blurred', () => {
    const wrapper = mount(<ClockContainer />);
    const event = {
      target: {
        id: 'session-length',
        value: 0
      }
    }
    const sessionDecrementButton = wrapper.find('#session-length').simulate('blur', event);
    expect(wrapper.state().sessionLength).toBe(1);
    event.target.value = -1;
    expect(wrapper.state().sessionLength).toBe(1);
  });

  it('sets the length to 60 if the length is greater than sixty when the input is blurred', () => {
    const wrapper = mount(<ClockContainer />);
    const event = {
      target: {
        id: 'session-length',
        value: 70
      }
    }
    const sessionDecrementButton = wrapper.find('#session-length').simulate('blur', event);
    expect(wrapper.state().sessionLength).toBe(60);
    event.target.value = 61;
    expect(wrapper.state().sessionLength).toBe(60);
  });
});

describe('snapshot', () => {
  it.skip('renders', () => {
    const component = renderer.create(<ClockContainer />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
