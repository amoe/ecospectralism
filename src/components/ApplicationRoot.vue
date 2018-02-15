<template>
<div class="page">
  <h1>New Project from amoe-vue-template</h1>
  
  <p>Hi there!</p>
  <p>The value is: <code>{{count}}</code></p>
  
  <p>Channels: <output>{{nChannels}}</output></p>
  
  <button v-on:click="greet">Greet</button>
  <button v-on:click="doIncrement">Inc</button>
  <button v-on:click="addViz">Add viz</button>
  
  <div>
    <input type="file" accept="audio/*" multiple v-on:change="myMethod"/>
  </div>
  
  <!-- <div> -->
  <!--   <canvas ref="canvas" id="grid2" width="320" height="320"> -->
  <!--   </canvas> -->
  <!-- </div> -->
  
  <div class="visualization-grid">
    <div v-for="datum in visualizationData" v-viz="datum" class="single-viz">
    </div>
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
    directives: {
        viz: {
            bind(el, binding) {
            },
            // inserted is the only callback where we have access to the
            // rendered scrollWidth
            inserted(el, binding) {
                console.log("concrete width is %o, concrete height is %o", el.offsetWidth, el.offsetHeight);
                
                const canvas = document.createElement('canvas');
                canvas.setAttribute('width', el.offsetWidth.toString());
                canvas.setAttribute('height', el.offsetHeight.toString());
                el.appendChild(canvas);

                const context = canvas.getContext('2d');
                console.log("found draw context %o", context);
                const rmsFeatures = binding.value;
                
                const xScale = d3.scaleLinear().domain([0, rmsFeatures.length]).range([0, 320]);
                const yScale = d3.scaleLinear().domain([0, 1]).range([0, 200]);
                
                for (var i = 0; i < rmsFeatures.length; i++) {
                    const d = rmsFeatures[i];
                    const xPosition = xScale(i);
                    const yHeight = yScale(d);
                
                    context.fillRect(xPosition, 0, 1, yHeight);
                }
            },
            update(el, binding) {
            },
            componentUpdated(el, binding) {
            },
            unbind(el, binding) {
            }
        }
    },
    components: {
    },
    data: function() {
        return {
            buf: null,
            context: null,
            nChannels: null,
            visualizationData: []
        };
    },
    mounted: function (this: any) {
        this.$nextTick(() => {
//            this.context = this.$refs.canvas.getContext('2d');
        });
    },
    methods: {
        addViz(features) {
            this.visualizationData.push(features);
        },
        greet() {
            console.log("hello");
            console.log("state val is %o", (document.querySelector('.single-viz') as HTMLElement).offsetWidth);
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

                    // I think this is not a full implementation of what the
                    // async analyzer will do.  We'd really need to compare
                    // the extracted features to find out.  But it looks like
                    // this is missing some logic; see audio-callback.js.
                    const rmsFeatures = analysis.extractRms(source);
                    console.log("found RMS features: %o", rmsFeatures.length);

                    this.visualizationData.push(rmsFeatures);
                    
                });
        },
        draw(rmsFeatures) {
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
h1,h2 { font-family: Georgia; }

p, label { font-family: Arial, sans-serif; }

div.page {
    max-width: 64rem;
    margin-left: auto;
    margin-right: auto;
    background-color: #fdfdfd;
}

div.single-viz {
    background-color: #a0a0a0;
    width: 16rem;
    height: 16ex;
    position: relative;
}

div.visualization-grid {
    display: grid;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
}

</style>
