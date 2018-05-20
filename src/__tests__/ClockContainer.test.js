import React from 'react';
import {shallow} from 'enzyme';
// import renderer from 'react-test-renderer';
import ClockContainer from '../ClockContainer';
import TimeSetting from '../Components/TimeSetting';
import TimeDisplay from '../Components/TimeDisplay';
import Controls from '../Components/Controls';

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
  expect(timeDisplayWrapper.at(0).props().time).toEqual("25:00");
});

describe('snapshot', () => {
  it.skip('renders', () => {
    const component = renderer.create(<ClockContainer />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
