import {assert} from 'chai';
import MyComponent from '../src/components/MyComponent.vue';

it('has a created hook', function() {
    assert.equal(typeof (new MyComponent()).created, 'function');
});
