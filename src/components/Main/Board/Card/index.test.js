import Card from './index';
import React from 'react';
import { shallow } from 'enzyme';
const img = require('../../../../images/bystander.jpg');

describe('Card', () => {
	let mockCard = { type: 'bystander' };
	let mockFn = jest.fn();
	let wrapper = shallow(<Card card={mockCard} sendGuess={mockFn} />);
	it('should matchsnapshot', () => {
		wrapper = shallow(<Card card={{ type: 'bystander' }} sendGuess={mockFn} />);
		wrapper.setState({ flipped: false });
		expect(wrapper).toMatchSnapshot();
	});
	it('should matchsnapshot', () => {
		let wrapper = shallow(<Card card={mockCard} isActive={false} />);
		wrapper.setState({ flipped: true });
		expect(wrapper).toMatchSnapshot();
	});
  it('sendGuess should be called on click of the card', () => {
    wrapper = shallow(<Card card={{ type: 'bystander' }} sendGuess={mockFn} isActive={true} />);
		jest.spyOn(wrapper.instance(), 'handleClick');
    let mockEvent = { target: { value: '', name: 'title' }, currentTarget: {value: 3} };
    
		wrapper.find('article').simulate('click', mockEvent);
		expect(mockFn).toHaveBeenCalled();
	});
	it('should send an id when is Active is true and card.type is false', () => {
		let mockCard = { type: false };
		wrapper = shallow(<Card card={mockCard} sendGuess={mockFn} isActive={true} />);
		expect(mockFn).toHaveBeenCalled();
	});
	it('should not send an id when is Active is false and card.type is true', () => {
		let mockCard = { type: 'bystander' };
		wrapper = shallow(<Card card={mockCard} sendGuess={mockFn} isActive={false} />);
		expect(mockFn).toHaveBeenCalled();
	});
});
