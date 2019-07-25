import React from 'react';
import Board from './index';
import { mount, shallow } from 'enzyme';

describe('Board', () => {
  let test = "test";
   let wrapper = shallow(<Board userName="Lynne" cardData={[{id: 1, word: 'fml'}]}/>);
  it('should match component snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render Component', () => {	
    const wrapper = mount(<Board userName={test} cardData={[{id: 1, word: 'fml'}]}/>);	
    expect(wrapper.debug()).toMatchSnapshot();	
  });


});