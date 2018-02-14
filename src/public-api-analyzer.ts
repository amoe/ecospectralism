// chunked-analyzer.ts

// This will allow use of the chunked analyzer.

import * as Meyda from 'meyda';

const exportedFunctions = {
    extractRms: function (source) {
        // It's a big problem that we only deal with the first channel.
        const sampleRate = 1024;
        const channelData = source.buffer.getChannelData(0);
        const results = [];
        
        for (let i = 0; i < channelData.length - sampleRate; i += sampleRate) {
            const r = Meyda.extract('rms', channelData.slice(i, i + sampleRate));
            results.push(r);
        }
        
        return results;
    }
};

export default exportedFunctions;

