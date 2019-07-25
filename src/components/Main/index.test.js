import React from 'react';
import Main from '.';
import { shallow } from 'enzyme';

describe('Main', () => {
	let wrapper;
	let mockPlayers = [ { players: { blueIntel: { name: 'test' } } }, { players: { blueIntel: { name: 'test' } } } ];
	let mockScores = { blueScore: 0, redScore: 0 };

	beforeEach(() => {
		wrapper = shallow(<Main cardData={[ { id: 3, type: 'red' } ]} scores={mockScores} players={mockPlayers} />);
	});

	it('should match component snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
