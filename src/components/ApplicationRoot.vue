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

    <div>
      <canvas ref="canvas" id="grid2" width="320" height="320">
      </canvas>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
import Vuex from 'vuex';
import utility from '../utility';
import * as Meyda from 'meyda';
import * as d3 from 'd3-scale';
import analysis from '../async-analyzer';

export default Vue.extend({
    components: {
    },
    data: function() {
        return {
            buf: null,
            context: null,
        };
    },
    mounted: function (this: any) {
        this.$nextTick(() => {
            this.context = this.$refs.canvas.getContext('2d');
        });
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
            console.log("canvas is %o", this.$refs.canvas);
            
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
        onFileLoaded(this: any, reader) {
            const buffer = reader.result;
            const feature = 'rms';
            const context = new AudioContext();
            
            const self = this;
            
            context.decodeAudioData(reader.result)
                .then(data => {
                    console.log("have now decoded data");
                    const source = context.createBufferSource();
                    source.buffer = data;


                    source.onended = e => {
                        console.log("playback has now ended at %o", new Date());
                    };
                    
                    analysis.analyze(source, context, f => {
                        if (f.rms !== 0) {
                            this.$store.dispatch('increment');
                        }
                    });

                    console.log("starting at %o", new Date());

                    // Needed
                    source.start();

                });
        },
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
