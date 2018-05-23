import React from 'react';
import {shallow, mount} from 'enzyme';
// import renderer from 'react-test-renderer';
import ClockContainer from './ClockContainer';
import TimeSetting from './Components/TimeSetting/TimeSetting';
import TimeDisplay from './Components/TimeDisplay/TimeDisplay';
import Controls from './Components/Controls/Controls';

const RealDate = Date;

afterEach(() => {
  global.Date = RealDate;
  jest.clearAllTimers();
});

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
    expect(wrapper.find('audio#beep')).toHaveLength(1);
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
    expect(timeDisplayWrapper.at(0).props().type).toEqual('session');
    expect(timeDisplayWrapper.at(0).props().time).toEqual(wrapper.state().sessionLength*60);
  });
});

describe('style', () => {
  it('sets percentHeight correctly', () => {
    Date.now = jest.fn();
    for (let dateVal = 1527020000000; dateVal < 1527020302000; dateVal += 1000) {
      Date.now.mockReturnValueOnce(dateVal);
    }
    
    jest.useFakeTimers();
    
    const wrapper = shallow(<ClockContainer />);
    
    wrapper.instance().beep = { play: () => {}, pause: () => {} }
    
    wrapper.setState({ 
      sessionLength: 5,
      timeLeft: 300,
      isRunning: true
    });

    wrapper.instance().countdown();
    wrapper.update();
    expect(wrapper.state().percentLeft).toBe(100);
    
    for (let i=0; i<75; i++) {
      wrapper.instance().countdown();
    }
    let percentLeft = Math.round(wrapper.state().percentLeft)
    expect(percentLeft).toBe(75);
    
    for (let i=0; i<75; i++) {
      wrapper.instance().countdown();
    }
    percentLeft = Math.round(wrapper.state().percentLeft)
    expect(percentLeft).toBe(50);

    for (let i=0; i<75; i++) {
      wrapper.instance().countdown();
    }
    percentLeft = Math.round(wrapper.state().percentLeft)
    expect(percentLeft).toBe(25);

    for (let i=0; i<75; i++) {
      wrapper.instance().countdown();
    }
    percentLeft = Math.round(wrapper.state().percentLeft)
    expect(percentLeft).toBe(0);
  });

  it('resets percentHeight to 100 when countdown finishes', () => {
    const wrapper = shallow(<ClockContainer />);
    wrapper.instance().beep = { play: () => {}, pause: () => {} };
    Date.now = jest.fn().mockReturnValueOnce(1527020001000);

    wrapper.setState({ percentLeft : 1 , endTime: 1527020000000 });

    wrapper.instance().countdown();
    expect(wrapper.state().percentLeft).toBe(100);
  });

  it('resets percentHeight to 100 when clock reset', () => {
    const wrapper = shallow(<ClockContainer />);
    wrapper.instance().beep = { play: () => {}, pause: () => {} };
    wrapper.setState({ percentLeft : 50 });
    wrapper.instance().handleReset();
    expect(wrapper.state().percentLeft).toBe(100);
  });
});

describe('change break and session lengths', () => {
  it('increments the length by one on button click and passes the new value', () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({sessionLength: 5});
    wrapper.find('#session-increment').simulate('click');
    expect(wrapper.state().sessionLength).toBe(6);
    expect(wrapper.find(TimeSetting).at(0).props().length).toBe(6);
  });
  
  it('displays the new time in TimeDisplay on increment of current type', () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({sessionLength: 5, current: "session"});
    wrapper.find('#session-increment').simulate('click'); // session length now 6 minutes
    expect(wrapper.find(TimeDisplay).props().time).toBe(6*60);
    expect(wrapper.find(TimeDisplay).find("#time-left").text()).toBe("6:00");
  }); 

  it("doesn't change TimeDisplay on increment of non current type", () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({
      breakLength: 3, 
      sessionLength: 5, 
      timeLeft: 300, 
      current: 'session'
    });
    wrapper.find('#break-increment').simulate('click'); // break length now 4 minutes
    expect(wrapper.find(TimeDisplay).props().time).toBe(5*60); // no change
    expect(wrapper.find(TimeDisplay).find("#time-left").text()).toBe("5:00");
  }); 
  
  it('decrements the length by one on button click and passes the new value', () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({sessionLength: 5});
    wrapper.find('#session-decrement').simulate('click');
    expect(wrapper.state().sessionLength).toBe(4);
    expect(wrapper.find(TimeSetting).at(0).props().length).toBe(4);
  });
  
  it('displays the new time in TimeDisplay on decrement of current type', () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({sessionLength: 5, current: 'session'});
    wrapper.find('#session-decrement').simulate('click'); // session length now 4 minutes
    expect(wrapper.find(TimeDisplay).props().time).toBe(4*60);
    expect(wrapper.find(TimeDisplay).find("#time-left").text()).toBe("4:00");
  }); 

  it("doesn't change TimeDisplay on decrement of non current type", () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({
      breakLength: 3, 
      sessionLength: 5, 
      timeLeft: 300, 
      current: 'session'
    });
    wrapper.find('#break-decrement').simulate('click'); // break length now 2 minutes
    expect(wrapper.find(TimeDisplay).props().time).toBe(5*60); // no change
    expect(wrapper.find(TimeDisplay).find("#time-left").text()).toBe("5:00");
  }); 

  it("can't go above 60 on button click and keeps the old value", () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({sessionLength: 60});
    wrapper.find('#session-increment').simulate('click');
    expect(wrapper.state().sessionLength).toBe(60);
  });

  it("can't go below 1 on button click and keeps the old value", () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({sessionLength: 1});
    wrapper.find('#session-decrement').simulate('click');
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
    wrapper.find('#session-length').simulate('change', event);
    expect(wrapper.state().sessionLength).toBe(20);
    expect(wrapper.find(TimeSetting).at(0).props().length).toBe(20);
  });

  it("doesn't display the new time when input changed", () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({timeLeft: 300});
    const event = {
      target: {
        id: 'session-length',
        value: 20
      }
    }
    wrapper.find('#session-length').simulate('change', event);
    expect(wrapper.find(TimeDisplay).props().time).not.toBe(20*60);
    expect(wrapper.find(TimeDisplay).props().time).toBe(300);
  });

  it('displays the new time in TimeDisplay when length of current type modified and then blurred', () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({timeLeft: 300, current: 'session'});
    const event = {
      target: {
        id: 'session-length',
        value: 20
      }
    }
    wrapper.find('#session-length').simulate('blur', event);
    expect(wrapper.find(TimeDisplay).props().time).toBe(20*60);
    expect(wrapper.find(TimeDisplay).find("#time-left").text()).toBe("20:00");
  }); 

  it("doesn't change TimeDisplay when length of non current type modified and then blurred", () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({
      breakLength: 3, 
      sessionLength: 5, 
      timeLeft: 300, 
      current: 'session'
    });
    const event = {
      target: {
        id: 'break-length',
        value: 20
      }
    }
    wrapper.find('#session-length').simulate('blur', event);
    expect(wrapper.find(TimeDisplay).props().time).toBe(300);
    expect(wrapper.find(TimeDisplay).find("#time-left").text()).toBe("5:00");
  }); 

  it('sets the length to 1 if the length is less than one when the input is blurred', () => {
    const wrapper = mount(<ClockContainer />);
    const event = {
      target: {
        id: 'session-length',
        value: 0
      }
    }
    wrapper.find('#session-length').simulate('blur', event);
    expect(wrapper.state().sessionLength).toBe(1);
    event.target.value = -1;
    expect(wrapper.state().sessionLength).toBe(1);
  });
  
  it("displays 1 minute in TimeDisplay if length less than 1 when input is blurred", () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({timeLeft: 300});
    const event = {
      target: {
        id: 'session-length',
        value: 0
      }
    }
    wrapper.find('#session-length').simulate('blur', event);
    expect(wrapper.find(TimeDisplay).props().time).toBe(1*60);
    expect(wrapper.find(TimeDisplay).find("#time-left").text()).toBe("1:00");
  }); 

  it('sets the length to 60 if the length is greater than sixty when the input is blurred', () => {
    const wrapper = mount(<ClockContainer />);
    const event = {
      target: {
        id: 'session-length',
        value: 70
      }
    }
    wrapper.find('#session-length').simulate('blur', event);
    expect(wrapper.state().sessionLength).toBe(60);
    event.target.value = 61;
    expect(wrapper.state().sessionLength).toBe(60);
  });

  it("displays 60 minutes in TimeDisplay if length > 60 when input is blurred", () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({timeLeft: 300});
    const event = {
      target: {
        id: 'session-length',
        value: 61
      }
    }
    wrapper.find('#session-length').simulate('blur', event);
    expect(wrapper.find(TimeDisplay).props().time).toBe(60*60);
    expect(wrapper.find(TimeDisplay).find("#time-left").text()).toBe("60:00");
  }); 

  it("can't increment lengths while timer is running", () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({ sessionLength: 5, isRunning: true });
    wrapper.find('#session-increment').simulate('click');
    expect(wrapper.state().sessionLength).toBe(5);
    expect(wrapper.find(TimeSetting).at(0).props().length).toBe(5);
  });
  
  it("can't change lengths via input while timer is running", () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({ sessionLength: 5, isRunning: true });
    const event = {
      target: {
        id: 'session-length',
        value: 20
      }
    }
    wrapper.find('#session-length').simulate('change', event);
    expect(wrapper.state().sessionLength).toBe(5);
    expect(wrapper.find(TimeSetting).at(0).props().length).toBe(5);
  });
});

describe('play and pause', () => {
  it('toggles isRunning state and passes it as props', () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({isRunning: true});

    wrapper.find('#start_stop').simulate('click');
    expect(wrapper.state().isRunning).toBeFalsy();
    expect(wrapper.find(TimeDisplay).props().isRunning).toBeFalsy();
    expect(wrapper.find(Controls).props().isRunning).toBeFalsy();

    wrapper.find('#start_stop').simulate('click');
    expect(wrapper.state().isRunning).toBeTruthy();
    expect(wrapper.find(TimeDisplay).props().isRunning).toBeTruthy();
    expect(wrapper.find(Controls).props().isRunning).toBeTruthy();
  });

  it('sets the correct end time when play button pressed and not already running', () => {
    Date.now = jest.fn().mockReturnValue(1527020000000);
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({timeLeft: 5*60, endTime: 0});

    wrapper.find('#start_stop').simulate('click');
    const newEndTime = Date.now() + (wrapper.state().timeLeft * 1000);
    expect(wrapper.state().endTime).toBe(newEndTime);  // rounded to nearest second
  });

  it('starts the countdown when play button pressed and not already running', () => {
    const wrapper = mount(<ClockContainer />);
    jest.useFakeTimers();
    wrapper.instance().countdown = jest.fn();
    wrapper.update();

    wrapper.find('#start_stop').simulate('click');
    jest.runTimersToTime(5000);
    expect(wrapper.instance().countdown).toHaveBeenCalledTimes(5);
  });

  it('decreases timeLeft by 1s every time countdown func is called and displays the new time in TimeDisplay', () => {
    Date.now = jest.fn();
    for (let dateVal = 1527020000000; dateVal < 1527020004000; dateVal += 1000) {
      Date.now.mockReturnValueOnce(dateVal);
    }
      
    const wrapper = shallow(<ClockContainer />);
    wrapper.setState({ sessionLength: 5, timeLeft: 5*60, current: 'session', endTime: Date.now() + (5*60 * 1000) });

    wrapper.instance().countdown();
    wrapper.instance().countdown();
    wrapper.instance().countdown();
    wrapper.update();
    expect(wrapper.state().timeLeft).toBe(5*60 - 3);
    expect(wrapper.find(TimeDisplay).props().time).toBe(5*60 - 3);
  });

  it('stops counting down when pause button pressed', () => {
    const wrapper = mount(<ClockContainer />);
    jest.useFakeTimers();
    wrapper.instance().countdown = jest.fn();
    wrapper.update();

    expect(setInterval).toHaveBeenCalledTimes(0);
    expect(clearInterval).toHaveBeenCalledTimes(0);

    wrapper.find('#start_stop').simulate('click');
    
    jest.runTimersToTime(2000);
    expect(wrapper.instance().countdown).toHaveBeenCalledTimes(2);
    
    wrapper.find('#start_stop').simulate('click');
    expect(clearInterval).toHaveBeenCalledTimes(1);
    
    jest.runTimersToTime(1000);
    expect(wrapper.instance().countdown).toHaveBeenCalledTimes(2); // same as before, not run again
  });

  it('starts counting down from paused time and same session when play button pressed after pause', () => {
    Date.now = jest.fn();
    for (let dateVal = 1527020000000; dateVal < 1527020009000; dateVal += 1000) {
      Date.now.mockReturnValueOnce(dateVal);
    }
      
    jest.useFakeTimers();

    const wrapper = shallow(<ClockContainer />);

    wrapper.instance().beep = { play: () => {}, pause: () => {} }

    wrapper.setState({ sessionLength: 5, timeLeft: 5*60, current: 'session', endTime: Date.now() + (5*60 * 1000) });

    wrapper.instance().handleStartStop(); // play
    jest.runTimersToTime(2000);
    expect(wrapper.state().timeLeft).toBe(5*60-2);
    
    wrapper.instance().handleStartStop(); // pause
    jest.runTimersToTime(3000);
    expect(wrapper.state().timeLeft).toBe(5*60-2); // unchanged during pause
    
    wrapper.instance().handleStartStop(); // play
    jest.runTimersToTime(4000);
    expect(wrapper.state().timeLeft).not.toBe(5*60-4); // this would be if started counting down from original session length
    expect(wrapper.state().timeLeft).toBe(5*60-6); // 2s from before pause + 4s from after pause
    expect(wrapper.state().current).toBe('session');
  });
});

describe('reset', () => {
  it('resets state variables to initial state', () => {
    const wrapper = mount(<ClockContainer />);
    wrapper.setState({
      sessionLength: 20,
      breakLength: 3,
      timeLeft: 1006,
      isRunning: true,
      current: 'break'
    });

    wrapper.find('#reset').simulate('click');
    expect(wrapper.state().sessionLength).toBe(25);
    expect(wrapper.state().breakLength).toBe(5);
    expect(wrapper.state().timeLeft).toBe(25*60);
    expect(wrapper.state().isRunning).toBe(false);
    expect(wrapper.state().current).toBe('session');
  });

  it('stops the countdown timer if running', () => {
    const wrapper = shallow(<ClockContainer />);
    jest.useFakeTimers();
    wrapper.instance().countdown = jest.fn();
    wrapper.instance().beep = { play: () => {}, pause: () => {} }

    wrapper.update();

    expect(setInterval).toHaveBeenCalledTimes(0);
    expect(clearInterval).toHaveBeenCalledTimes(0);

    wrapper.instance().timer(wrapper.state().timeLeft); // start timer
    jest.runTimersToTime(2000);
    expect(wrapper.instance().countdown).toHaveBeenCalledTimes(2);
    
    wrapper.instance().handleReset(); // clear timer
    expect(clearInterval).toHaveBeenCalledTimes(1);
    
    jest.runTimersToTime(1000);
    expect(wrapper.instance().countdown).toHaveBeenCalledTimes(2); // same as before, not run again
  });
});

describe('toggle between break and session times', () => {
  it('toggles label and start time (break/session) of TimeDisplay when countdown gets to 0', () => {
    Date.now = jest.fn();
    for (let dateVal = 1527020000000; dateVal < 1527020064000; dateVal += 1000) {
      Date.now.mockReturnValueOnce(dateVal);
    }
  
    jest.useFakeTimers();

    const wrapper = shallow(<ClockContainer />);

    wrapper.instance().beep = { play: () => {}, pause: () => {} }

    wrapper.setState({ 
      sessionLength: 2,
      breakLength: 1,
      timeLeft: 1, 
      endTime: 1527020000000, 
      current: 'session',
      isRunning: true
    });

    wrapper.instance().countdown();
    expect(wrapper.state().timeLeft).toBe(0);

    wrapper.instance().countdown();
    expect(clearInterval).toHaveBeenCalledTimes(1);
    wrapper.update();
    expect(wrapper.find(TimeDisplay).props().type).toBe('break');
    expect(wrapper.find(TimeDisplay).props().time).toBe(wrapper.state().breakLength * 60);

    for (let i=0; i<=60; i++) {
      wrapper.instance().countdown();
    }
    expect(clearInterval).toHaveBeenCalledTimes(2);
    wrapper.update();
    expect(wrapper.find(TimeDisplay).props().type).toBe('session');
    expect(wrapper.find(TimeDisplay).props().time).toBe(wrapper.state().sessionLength * 60);
  });

  it('starts counting down next timer when timer gets to 0', () => {
    Date.now = jest.fn()
      .mockReturnValueOnce(1527020000000) // countdown
      .mockReturnValueOnce(1527020001000) // countdown
      .mockReturnValueOnce(1527020001000) // timer (wrapper.update)
      .mockReturnValueOnce(1527020002000) // countdown
      .mockReturnValueOnce(1527020003000) // countdown
  
    jest.useFakeTimers();

    const wrapper = shallow(<ClockContainer />);

    wrapper.instance().beep = { play: () => {}, pause: () => {} }

    wrapper.setState({
      sessionLength: 2,
      breakLength: 1,
      timeLeft: 1, 
      endTime: 1527020000000, 
      current: 'session',
      isRunning: true
    });

    wrapper.instance().countdown();
    expect(wrapper.state().timeLeft).toBe(0);

    wrapper.instance().countdown();
    wrapper.update();

    const newTime = wrapper.state().breakLength * 60;
    expect(wrapper.find(TimeDisplay).props().time).toBe(newTime);
    
    jest.runTimersToTime(2000);
    expect(wrapper.state().timeLeft).toBe(newTime-2);
  });
});

describe('audio', () => {
  let wrapper;
  beforeEach(() => {
    jest.useFakeTimers();

    Date.now = jest.fn().mockReturnValueOnce(1527020000000)

    wrapper = shallow(<ClockContainer />);
    wrapper.instance().beep = { play: jest.fn(), pause: jest.fn(), currentTime: 5 }
    wrapper.setState({ timeLeft: 1, endTime: 1527020000000, isRunning: true });
  });

  it('plays audio when countdown gets to 0', () => {
    wrapper.instance().countdown();
    expect(wrapper.state().timeLeft).toBe(0);
    expect(wrapper.instance().beep.play).toBeCalled();
  });

  it("doesn't play audio when muted", () => {
    wrapper.setState({ isMuted : true })
    wrapper.instance().countdown();
    expect(wrapper.state().timeLeft).toBe(0);
    expect(wrapper.instance().beep.play).not.toBeCalled();
  });

  it('stops and resets audio when countdown paused', () => {
    wrapper.instance().countdown();
    expect(wrapper.instance().beep.play).toBeCalled();
    expect(wrapper.instance().beep.currentTime).toBe(5);

    wrapper.instance().handleStartStop();
    expect(wrapper.instance().beep.pause).toBeCalled();
    expect(wrapper.instance().beep.currentTime).toBe(0);
  });

  it('stops and resets audio when timer reset', () => {
    wrapper.instance().countdown();
    expect(wrapper.instance().beep.play).toBeCalled();
    expect(wrapper.instance().beep.currentTime).toBe(5);

    wrapper.instance().handleReset();
    expect(wrapper.instance().beep.pause).toBeCalled();
    expect(wrapper.instance().beep.currentTime).toBe(0);
  });

  it('handleMute toggles muted state', () => {
    expect(wrapper.state().isMuted).toBeFalsy();
    wrapper.instance().handleMute();
    expect(wrapper.state().isMuted).toBeTruthy();
    wrapper.instance().handleMute();
    expect(wrapper.state().isMuted).toBeFalsy();
  });
});

describe('snapshot', () => {
  it.skip('renders', () => {
    const component = renderer.create(<ClockContainer />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
