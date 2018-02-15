const functions = {
    // This is taken from the Axios docs.  Should be ported to loglevel
    handleAxiosError(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser
            // and an instance of http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an 
            // Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    },

    single(sequence) {
        if (sequence === null) {
            throw new Error("unexpected null sequence");
        }

        if (typeof sequence === undefined) {
            throw new Error("unexpected undefined sequence");
        }


        if (sequence.length === 0) {
            throw new Error("item not found");
        }

        if (sequence.length > 1) {
            throw new Error("multiple items found, can't happen");
        }

        if (sequence.length !== 1) {
            throw new Error("really bizarre case");
        }
        
        return sequence[0];
    }

};

export default functions;
