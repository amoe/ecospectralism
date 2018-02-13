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
import Meyda from 'meyda';

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
                reader.onload = e => this.onFileLoaded(reader);
                reader.readAsArrayBuffer(thisFile);
            }
        },
        onFileLoaded(reader) {
            const buffer = reader.result;
            const feature = 'rms';
            const context = new AudioContext();

            context.decodeAudioData(reader.result)
                .then(data => {
                    console.log("decoded audio data now");
                })

            // const meydaOptions = {
            //     "audioContext":context, // required
            //     "source":source, // required
            //     "bufferSize": 512, // required
            //     "hopSize": 256, // optional
            //     "windowingFunction": "hamming", // optional
            //     "featureExtractors": ["rms"], // optional - A string, or an array of strings containing the names of features you wish to extract.
            //     "callback": Function // optional callback in which to receive the features for each buffer
            // }

            //  const meydaAnalyzer = Meyda.createMeydaAnalyzer(meydaOptions);
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
