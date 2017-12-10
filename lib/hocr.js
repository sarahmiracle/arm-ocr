var cheerio = require('cheerio');
var fileManagement = require('./fileManagement');
var spawn = require('child_process').spawn;

function confToRGB(conf){
    var ret = {
        "r": 0,
        "g": 0,
        "b": 0
    };
    conf = parseInt( conf * 420.0 / 100 );
    if(conf <= 210) {
        ret.r = 210;
        ret.g = conf;
    }
    else {
        conf -= 210;
        ret.g = 210;
        ret.r = 210 - conf;
    }
    return ret;
}

function runSpellCheck(inputJson){
    return new Promise(function(resolve, reject){
        
        var options = {
            cwd: __dirname
        };
        var py = spawn('python3', [__dirname + '/spellcheck.py'], options);
        var data = inputJson;
        var dataString = '';
        
        py.stdout.on('data', function(data){
          dataString += data.toString();
        });
        
        py.stdout.on('end', function(){
            var result = JSON.parse(dataString);
            resolve(result);
        });
        
        py.stdin.write(JSON.stringify(data));
        py.stdin.end();
    });
}

function processHocr(hocrText) {
    return new Promise(function(resolve, reject){
        var $ = cheerio.load(hocrText);
        var body = $('div.ocr_page');
        
        $('div').each(function(i, elem) { $(elem).removeAttr('title') });
        $('p').each(function(i, elem) { $(elem).removeAttr('title') });
        $('span.ocr_line').each(function(i, elem) { $(elem).removeAttr('title') });
        
        var words = body.find('span.ocrx_word');
        var wordsJson = [];
        
        words.each(function(i, elem) {
            var title = $(elem).attr('title');
            var conf = title.indexOf('x_wconf');
            if(conf == -1) conf = 0;
            else {
                conf = title.substr(conf + 'x_wconf'.length);
                conf = parseInt(conf);
            }
            var color = confToRGB(conf);
            $(elem).attr('style', 'background-color: rgb(' + color.r + ','+color.g+','+color.b+'0);');
            
            var wordInfo = {
                "word": "",
                "conf": conf
            };
            
            if($(elem).find("strong").length > 0) 
                wordInfo.word = cheerio.load($(elem).find("strong").html(), {decodeEntities: false}).text();
            else wordInfo.word = cheerio.load($(elem).html(), {decodeEntities: false}).text();
            
            wordsJson.push(wordInfo);
            
            //$(elem).attr('title', '');
        });
        
        runSpellCheck(wordsJson)
            .then(function(replacements){
                words.each(function(i, elem) {
                    $(elem).attr('title', replacements[i]);
                });
                resolve(body.html());
            });
    });
}





module.exports.processHocr = processHocr;


