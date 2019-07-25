import AgentHUD from './index'
import { shallow } from 'enzyme'
import React from 'react'


describe('AgentHUD', () => {
  let wrapper = shallow(<AgentHUD
    isActive={true}
    hint={{hintWord: 'hello'}}
    remainingAttempts={3}
  />)

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    });
});