import JoinGame from './index'
import React from 'react'
import {shallow } from 'enzyme'


describe('JoinGame', () => {
  let wrapper = shallow(<JoinGame/>)
  let event = {target:{value: "test", name: 'name'}, preventDefault: jest.fn()}
  it('should matchsnapShot', () => {
    expect(wrapper).toMatchSnapshot()
  });
  it('should call updateState on submit', () => {
    wrapper.find('.JoinGame').simulate('submit', event)
    expect(wrapper.state('redirect')).toEqual(true)
  });
  it('should update state on change', () => {
    wrapper.find('input').simulate('change', event)
    expect(wrapper.state('name')).toEqual('test')

  });

});