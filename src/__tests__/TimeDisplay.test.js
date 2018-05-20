import React from 'react';
import {shallow} from 'enzyme';
// import renderer from 'react-test-renderer';
import TimeDisplay from '../Components/TimeDisplay';

it('renders without crashing', () => {
  shallow(<TimeDisplay />);
});

describe('snapshot', () => {
  it.skip('renders', () => {
    const component = renderer.create(<TimeDisplay />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
});
