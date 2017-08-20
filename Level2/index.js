var express = require('express');
var app = express();
var router = express.Router();

var path = __dirname + '/views/';

app.use('/', router);

router.get('/login', function (req, res) {
    res.sendFile(path + 'login.html');
});

router.get('/home*', function (req, res) {
    res.cookie('code', req.query.code);
    res.sendFile(path + 'home.html');
});

app.use('*', function (req, res) {
    res.send('Error 404: Not Found!');
});

app.listen(8083, function () {
});