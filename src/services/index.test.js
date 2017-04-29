/* global assert, describe, it */
import {Objective} from '../models';
import {Map} from 'immutable';
import {arrayToMapById} from './';

describe('ESS-PROTO', () => {
   describe('Array to Map By Id', () => {
        const array = [
            {id: 'a123', title: 'Become a better person'},
            {id: 'b456', title: 'Become a master of defence'},
            {id: '678', title: 'Be humble'}
        ];
        const immutableObjectives = arrayToMapById(array, Objective, Map);
        it('Should convert to a map with IDs as keys', () => {
            assert.equal(immutableObjectives.getIn(['678', 'title']), 'Be humble');
        });
        it('Should be immutable', () => {
            const modifiedMap = immutableObjectives.setIn(['a123', 'title'], 'Survive');
            assert.equal(immutableObjectives.getIn(['a123', 'title']), 'Become a better person', 'Old map remained unmodified');
            assert.equal(modifiedMap.getIn(['a123', 'title']), 'Survive', 'Modified title was applied');
            assert.equal(modifiedMap.toJS()['a123'].title, 'Survive', 'Key is not id');
        });
   });
});