var express = require('express');
var request = require('request');

// require('request-debug')(request);
var app = express();
console.log(__dirname + '/app');
app.use(express.static(__dirname + '/app'));

app.get('/jishoapi/:query', function(req, res, next) {
    var apiURL = 'http://jisho.org/api/v1/search/words?keyword=' + encodeURIComponent(req.params.query);
    request.get(apiURL).pipe(res);
});


app.listen(process.env.PORT || 3000);
