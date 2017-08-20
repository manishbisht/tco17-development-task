var express = require('express');
var app = express();
var router = express.Router();
var request = require('request');

var path = __dirname + '/views/';

app.use('/', router);

router.get('/login', function (req, res) {
    res.sendFile(path + 'login.html');
});

router.get('/home*', function (req, res) {
    res.cookie('code', req.query.code);
    res.sendFile(path + 'home.html');
});

router.get('/callback*', function (req, res) {
    var options = {
        host: 'https://api.digitalocean.com',
        port: 80,
        path: '/v2/droplets/59135605',
        method: 'POST',
        url: 'https://cloud.digitalocean.com/v1/oauth/token?client_id=80cfc4c4824c0df66fa472a5b7f859ce4f3fcc797a41dc9860807116723bf106&client_secret=b76e65fbbc6ae06c06eeb74077f4b41a2bf122ab10493b5919b0eea81053d127&grant_type=authorization_code&code=' + req.query.code + '&redirect_uri=http://localhost:8083/callback',
    };
    var data = '';
    request(options, function (error, response, body) {
        var options = {
            host: 'https://api.digitalocean.com',
            port: 80,
            path: '/v2/droplets/',
            method: 'GET',
            url: 'https://api.digitalocean.com/v2/droplets/59135605',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(body)['access_token']
            }
        };
        request(options, function (error, response, body) {
            res.send(body);
        });
    });
});

app.use('*', function (req, res) {
    res.send('Error 404: Not Found!');
});

app.listen(8083, function () {
});