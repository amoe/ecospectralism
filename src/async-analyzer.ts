import * as Meyda from 'meyda';

const exportedFunctions = {
    analyze(source, context, callback) {
        const requestedFeatures = ['rms'];
        
        const meydaOptions = {
            "audioContext": context,
            "source": source,
            "bufferSize": 512,
            "hopSize": 256,
            "windowingFunction": "hamming",
            "featureExtractors": requestedFeatures,
            "callback": callback
        }
        
        console.log("Meyda instance is %o", Meyda);
        const meydaAnalyzer = Meyda.createMeydaAnalyzer(meydaOptions);
        console.log("created analyzer using %o", requestedFeatures);
        meydaAnalyzer.start();
    }
};

export default exportedFunctions;
    
