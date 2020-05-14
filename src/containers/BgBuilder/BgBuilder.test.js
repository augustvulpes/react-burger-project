import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.3';

import { BgBuilder } from './BgBuilder';
import BuildControls from '../../components/Bg/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BgBuilder />', () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<BgBuilder onInitIngredients={() => {}} />);
    });

    it('should render <BuildContols /> when receiving ingredients', () => {
        wrapper.setProps({ings: {salad: 0}, price: 4});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})