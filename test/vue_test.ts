import {assert} from 'chai';
import MyComponent from '../src/components/MyComponent.vue';

it('has a created hook', function() {
    console.log(MyComponent.options);
    assert.equal(2 + 2, 4);
});
