this._m.spn.onaudioprocess = (e)=> {
    if (this._m.inputData !== null) {
        this._m.previousInputData = this._m.inputData;
    }

    this._m.inputData = e.inputBuffer.getChannelData(0);

    if (!this._m.previousInputData) {
        var buffer = this._m.inputData;
    } else  {
        var buffer = new Float32Array(this._m.previousInputData.length + this._m.inputData.length - this._m.hopSize);
        buffer.set(this._m.previousInputData.slice(this._m.hopSize));
        buffer.set(this._m.inputData, this._m.previousInputData.length - this._m.hopSize);
    };

    var frames = utilities.frame(buffer, this._m.bufferSize, this._m.hopSize);

    frames.forEach(f => {
        this._m.frame = f;

        var features = this._m.extract(
            this._m._featuresToExtract,
            this._m.frame,
            this._m.previousFrame);

        // call callback if applicable
        if (typeof this._m.callback === 'function' && this._m.EXTRACTION_STARTED) {
            this._m.callback(features);
        }

        this._m.previousFrame = this._m.frame;
    });
};
