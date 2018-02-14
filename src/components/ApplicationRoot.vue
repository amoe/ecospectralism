<template>
  <div>
    <h1>New Project from amoe-vue-template</h1>

    <p>Hi there!</p>
    <p>The value is: <code>{{count}}</code></p>

    <p>Channels: <output>{{nChannels}}</output></p>

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
import analysis from '../chunked-analyzer';

export default Vue.extend({
    components: {
    },
    data: function() {
        return {
            buf: null,
            context: null,
            nChannels: null
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
            
            
            // ARCHAEOLOGISTS-NOTE:
            // There used to be a version
            // using the async API at cba55812c4e69d8ad98e59a06fbd4c2f92c45cfc
            // But it's pegged to the 'real' clock so can't be used.
            context.decodeAudioData(reader.result)
                .then(data => {
                    console.log("have now decoded data");
                    const source = context.createBufferSource();
                    this.nChannels = data.numberOfChannels;
                    source.buffer = data;
                    const rmsFeatures = analysis.extractRms(source);
                    console.log("found RMS features: %o", rmsFeatures.length);
                    
                    this.draw(rmsFeatures);
                });
        },
        draw(rmsFeatures) {
            // x scale takes max index
            const xScale = d3.scaleLinear().domain([0, rmsFeatures.length]).range([0, 320]);
            const yScale = d3.scaleLinear().domain([0, 1]).range([0, 200]);
            
            for (var i = 0; i < rmsFeatures.length; i++) {
                const d = rmsFeatures[i];
                const xPosition = xScale(i);
                const yHeight = yScale(d);
                
                this.context.fillRect(xPosition, 0, 1, yHeight);
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
