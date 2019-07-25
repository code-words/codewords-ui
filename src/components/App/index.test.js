import React from 'react';
import App from './index';
import { shallow } from 'enzyme';


describe('App', () => {
let mockFn = jest.fn()
let wrapper = shallow(<App cable= {mockFn}/>);
  it('should match component snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should call handleUserInit on click', () => {
    wrapper.setState({ user: { } });
    let obj = {id: 1, name: "test", token: "234wefawewe"}
    wrapper.instance().handleUserInit(obj)
    expect(wrapper.state('user')).toEqual(obj);  
  });
  it('should update state when updateHintLogs is called', () => {
    wrapper.setState({ hintLogs: [] });
    let hint = "hint";
    let expected = ["hint"]
    wrapper.instance().updateHintLogs(hint)
    expect(wrapper.state('hintLogs')).toEqual(expected);  
  });
  it('should update state when setPlayer is called', () => {
    wrapper.instance().setPlayer({ playerRoster: [{name: "test"},{name: "also test"},{name: "much test"},{name: "such test"}] })
    expect(wrapper.state('isLobbyFull')).toEqual(true);  
  });
  it('should update state when setGame is called ', () => {
    wrapper.setState({cards:[], players:[], firstPlayerId: 2, user:{id:1, intel: true}});
    wrapper.instance().setGame({cards: ["test", "testing", "more"], players:[{name:"One"}, {name: "Two"}, {name: "Three"}], firstPlayerId: 1})
  });
  it('should update state when clearHint is called', () => {
    wrapper.instance().clearHint(0);
    expect(wrapper.state('currentHint')).toEqual({"hintWord": "", "relatedCards": null});  
  });
  it('should accurately navigate the dataSwitch', () => {
    const spy = jest.spyOn(wrapper.instance(), "setPlayer")
    wrapper.instance().dataSwitch({type: 'player-joined', data:{playerRoster:["1", "2"]}});
    expect(spy).toHaveBeenCalled();
  })

})