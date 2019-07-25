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
  it.skip('should update state on change', () => {
    wrapper.find('input').simulate('change', event)
    expect(wrapper.state('name')).toEqual('test')
  });
  it('should update state when HandleChange is called', () => {
    let event = {target:{name:"name", value:"testing"}}
    wrapper.instance().handleChange(event)
    expect(wrapper.state('name')).toEqual('testing')
  });

});