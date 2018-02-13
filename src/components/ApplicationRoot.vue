<template>
  <div>
    <h1>New Project from amoe-vue-template</h1>

    <p>Hi there!</p>
    <p>The value is: <code>{{count}}</code></p>
    <button v-on:click="greet">Greet</button>
    <button v-on:click="doIncrement">Inc</button>

    <div>
      <input type="file" accept="audio/*" multiple v-on:change="myMethod"/>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Vuex from 'vuex';
import utility from '../utility';
 export default Vue.extend({
     components: {
     },
     data: function() {
         return {
         };
     },
     methods: {
         greet() {
             console.log("hello");
             console.log("state val is %o", this.$store.state.count);
         },
         doIncrement() {
             this.$store.dispatch('increment');
         },
         myMethod(event) {
             console.log("inside my method");
             console.log("arguments are %o", event);

             const files = event.target.files;
             console.log("files object is %o", files);

             for (var i = 0; i < files.length; i++) {
                 const thisFile = files[i];

                 console.log("this file is %o", thisFile);

                 const reader = new FileReader();

                 // Close over the reader to access the result
                 reader.onload = function (e) {
                     console.log("read completed");
                     console.log("event.target.result = %o", reader.result);
                 };
                 reader.readAsArrayBuffer(thisFile);
             }
         }
     },
     // mapState doesn't work with typescript: "Property 'mapState' does not exist on type"
     // So we manually create the relevant computed properties.
     computed: {
         count: function (this: any) {
             return this.$store.state.count;
         }
     }
 });
</script>

<style>
body {
    max-width: 64rem;
    margin-left: auto;
    margin-right: auto;
    background-color: #fdfdfd;
}

h1,h2 { font-family: Georgia; }

p, label { font-family: Arial, sans-serif; }
</style>
