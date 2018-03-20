import {assert} from 'chai';
import MyComponent from '../src/components/MyComponent.vue';

it('has a created hook', function() {
//    console.log(MyComponent.options);
//    console.log('MyComponent Properties', Object.getOwnPropertyNames(new MyComponent()));

    // console.log("Value of MyComponent is %o", MyComponent.created);
    // assert.equal(2 + 2, 4);
});


it('sets default data correctly', function() {
    const defaultData = MyComponent.data();
    assert.equal(defaultData.message, "hello");
});
