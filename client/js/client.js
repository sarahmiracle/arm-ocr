var Client = function(octApi) {
    this.octApi = octApi;
    
    this.socket = io();
    this.uploader = new SocketIOFileClient(this.socket);
    
    this.initSocket(this.octApi);
    
    this.initUploader();
};


Client.prototype.initSocket = function(octApi) {
    this.socket.on('receiveTranslation', function(translation) {
        octApi.receivedTranslation(translation);
    });
    this.socket.on("receiveText", function(recognizedText){
        octApi.receivedRecognizedText(recognizedText);
    });
    this.socket.on("receivePdf", function(url){
        octApi.receivePdf(url);
    });
    this.socket.on("receiveHocr", function(url){
        octApi.receiveHocr(url);
    });
    this.socket.on("errorMessage", function(msg){
        alert(msg);
    });
};


Client.prototype.initUploader = function() {
    this.uploader.on('start', function(fileInfo) {
        console.log('Start uploading', fileInfo);
    });
    this.uploader.on('stream', function(fileInfo) {
        console.log('Streaming... sent ' + fileInfo.sent + ' bytes.');
    });
    this.uploader.on('complete', function(fileInfo) {
        console.log('Upload Complete', fileInfo);
    });
    this.uploader.on('error', function(err) {
        console.log('Error!', err);
    });
    this.uploader.on('abort', function(fileInfo) {
        console.log('Aborted: ', fileInfo);
    });
};

Client.prototype.upload = function(fileElement, isFast, type) {
    var msg = {
        "isFast": isFast,
        "type": type
    };
    
    this.uploader.upload(fileElement, {
        data: msg
    });
};

Client.prototype.requestRecognitionByUrl = function(url, isFast, type) {
    var msg = {
        "url": url,
        "isFast": isFast,
        "type": type
    };
    this.socket.emit("recognizeByUrl", msg);
};

Client.prototype.requestTranslation = function(text, toLang, removeEndlines) {
    var msg = {
        "text": text,
        "toLang": toLang,
        "removeEndl": removeEndlines
    };
    this.socket.emit('translateText', msg);
}

