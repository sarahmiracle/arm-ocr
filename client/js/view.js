var View = function() {
    
};

View.prototype.changeSrcLocal = function() {
    var input = document.getElementById('imageFile');
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("armImg").src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
};

View.prototype.setFinalText = function(text) {
    document.getElementById("finalText").innerHTML = text;
};

View.prototype.setRecognizedText = function(text) {
    document.getElementById("recognizedText").value = text;
};

View.prototype.getRecognizedText = function() {
    return document.getElementById("recognizedText").value;
};


View.prototype.reveal = function() {
    document.getElementById("imgInfo").classList.remove('hidden');
    document.getElementById("hocr_preview").classList.add('hidden');
    document.getElementById("final_preview").classList.remove('hidden');
    document.getElementById("editor").classList.remove('hidden');
};

View.prototype.showHocr = function(){
    document.getElementById("imgInfo").classList.remove('hidden');
    document.getElementById("hocr_preview").classList.remove('hidden');
    document.getElementById("final_preview").classList.add('hidden');
    document.getElementById("editor").classList.add('hidden');
};


View.prototype.getImgURL = function() {
    return document.getElementById("imgUrl").value;
};

View.prototype.getIsFast = function() {
    return document.getElementById("isFast").checked;
};

View.prototype.getType = function() {
    return $('input[name=optionsRadios]:checked').val();
};

View.prototype.setImage = function(url) {
    document.getElementById("armImg").src = url;
};

View.prototype.hide = function() {
    document.getElementById("imgInfo").classList.add('hidden');
};

View.prototype.getToLang = function() {
    return document.getElementById("toLanguage").value;
};
