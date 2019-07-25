import React from 'react';
import Main from '.';
import { shallow } from 'enzyme';

describe('Main', () => {
	let wrapper;
  // let mockPlayers = [{ players: { blueIntel: { name: 'test' } } }, { players: { blueIntel: { name: 'test' } } }];
  let mockPlayers = [
    { isIntel: true, isBlueTeam: true, name: "Bob1" },
    { isIntel: true, isBlueTeam: false, name: "Bob2" },
    { isIntel: false, isBlueTeam: true, name: "Bob3" },
    { isIntel: false, isBlueTeam: false, name: "Bob4" }
  ];
	let mockScores = { blueScore: 0, redScore: 0 };
	wrapper = shallow(<Main cardData={[ { id: 3, type: 'red' } ]} scores={mockScores} players={mockPlayers} />);

	beforeEach(() => {
    wrapper = shallow(<Main cardData={[{ id: 3, type: 'red' }]} scores={mockScores} user={{name: 'Bob'}} players={mockPlayers} />);
	});

	it('should match component snapshot', () => {
		expect(wrapper.debug()).toMatchSnapshot();
	});
});
