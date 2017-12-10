var Octopus = function() {
    this.client = new Client(this.makeClientApi());
    
    this.data = new Data();
    this.view = new View();
    
    this.initFileUpload();
};

Octopus.prototype.makeClientApi = function() {
    var me = this;
    
    var receivedTranslation = function(translation){
        me.data.setFinalText(translation);
        me.view.setFinalText(translation);
    };
    
    var receivedRecognizedText = function(recognizedText){
        me.view.setRecognizedText(recognizedText);
        me.saveText();
        me.view.reveal();
    };
    
    var receivePdf = function(url){
        var pdfWindow = me.data.getPdfWindow();
        pdfWindow.location.href = url;
    };
    
    var receiveHocr = function(hocr){
        $('#hocr_preview').html(hocr);
        me.view.showHocr();
    };
    
    var clientApi = {
        "receivedTranslation": receivedTranslation,
        "receivedRecognizedText": receivedRecognizedText,
        "receiveHocr": receiveHocr,
        "receivePdf": receivePdf
    };
    return clientApi;
};


Octopus.prototype.processURL = function() {
    var url = this.view.getImgURL();
    this.view.setImage(url);
    
    var isFast = this.view.getIsFast();
    var type = this.view.getType();
    
    if(type == "pdf") this.openNewWindow();
    
    this.client.requestRecognitionByUrl(url, isFast, type);
    
    this.clearInfo();
    if(type == "pdf") this.view.hide();
};


Octopus.prototype.initFileUpload = function() {
    var form = document.getElementById('uploadForm');
    var me = this;
    
    form.onsubmit = function(ev) {
        ev.preventDefault();
        
        var fileEl = document.getElementById('imageFile');
        var isFast = me.view.getIsFast();
        var type = me.view.getType();
        
        if(type == "pdf") me.openNewWindow();
        
        me.client.upload(fileEl, isFast, type);
        
        me.view.changeSrcLocal();
        if(type == "pdf") me.view.hide();
    };
};


Octopus.prototype.clearInfo = function() {
    this.view.setRecognizedText("");
    this.saveText();
};

Octopus.prototype.openNewWindow = function(){
    var newWindow = window.open('', '_blank');
    newWindow.document.write('Creating PDF...');

    this.data.setPdfWindow(newWindow);
}

Octopus.prototype.saveText = function()
{
    var text = this.view.getRecognizedText();
    this.data.setFinalText(text);
    this.data.setLastSaved(text);
    this.view.setFinalText(text);
};

Octopus.prototype.translateText = function(removeEndlines)
{
    var text = this.data.getLastSaved();
    var toLang = this.view.getToLang();
    this.client.requestTranslation(text, toLang, removeEndlines);
};

var oct = new Octopus();