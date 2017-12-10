var Data = function() {
    this.finalText = "";
    this.lastSaved = "";
};

Data.prototype.setFinalText = function(text) {
    this.finalText = text;
};
Data.prototype.getFinalText = function() {
    return this.finalText;
};

Data.prototype.setLastSaved = function(text) {
    this.lastSaved = text;
};
Data.prototype.getLastSaved = function() {
    return this.lastSaved;
};

Data.prototype.setPdfWindow = function(newWindow) {
    this.pdfWindow = newWindow;
};
Data.prototype.getPdfWindow = function() {
    return this.pdfWindow;
};