var fs = require('fs');
//TODO: change these function

function getFileName() {
    return "" + Math.ceil(Math.random() * 100000);
}

function getFileNamePdf(filename){
    return filename + getFileName() + getFileName();
}

function makeFolder(folderName){
    return new Promise(function(resolve, reject){
        fs.mkdir(folderName, 0777, function(err) {
            if (err) {
                if (err.code == 'EEXIST') resolve(); // ignore the error if the folder already exists
                else reject(err); // something else went wrong
            } else resolve(); // successfully created folder
        });        
    });
}

function readFileU8(textpath){
    return new Promise(function(resolve, reject){
        fs.readFile(textpath, 'utf8', function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

module.exports.getFileNamePdf = getFileNamePdf;
module.exports.getFileName = getFileName;
module.exports.makeFolder = makeFolder;
module.exports.readFileU8 = readFileU8;