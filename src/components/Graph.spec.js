import React from 'react';
import { shallow } from 'enzyme';
import { Graph } from './Graph';

describe('<Graph />', () => {
  xit('should display savings when savings exist', () => {
    const savings = {
      monthly: '10',
      annual: '120',
      threeYear: '360'
    };

    const wrapper = shallow(<Graph savings={savings}/>);
    // console.log(wrapper.debug()); // View shallowly rendered component
    const savingsLabelText = wrapper.find('.fuel-savings-label').text();
    expect(savingsLabelText).toEqual('Savings');
  });

  xit('should give values a \'savings\' class when savings exist', () => {
    const savings = {
      monthly: '10',
      annual: '120',
      threeYear: '360'
    };

    const wrapper = shallow(<Graph savings={savings}/>);
    const numObjectsWithSavingsClass = wrapper.find('.savings').length;
    expect(numObjectsWithSavingsClass).toEqual(3);
  });

  xit('should display loss when savings don\'t exist', () => {
    const savings = {
      monthly: '-10',
      annual: '-120',
      threeYear: '-360'
    };

    const wrapper = shallow(<Graph savings={savings}/>);
    const labelText = wrapper.find('.fuel-savings-label').text();
    expect(labelText).toEqual('Loss');
  });

  xit('should give values a \'loss\' class when savings don\'t exist', () => {
    const savings = {
      monthly: '-10',
      annual: '-120',
      threeYear: '-360'
    };

    const wrapper = shallow(<Graph savings={savings}/>);
    const numObjectsWithLossClass = wrapper.find('.loss').length;
    expect(numObjectsWithLossClass).toEqual(3);
  });
});
