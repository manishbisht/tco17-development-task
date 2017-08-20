var http = require("http");
var request = require('request');

var options = {
    host: 'https://api.digitalocean.com',
    port: 80,
    path: '/v2/droplets/59135605',
    method: 'GET',
    url: 'https://api.digitalocean.com/v2/droplets/59135605',
    headers: {
        'Authorization': 'Bearer caadf695dc194c624c4d40c441d1e79332e3fd71aabd3b73775f4c5f89e3024f'
    }
};

request(options, function (error, response, body) {
    http.createServer(function (request, response) {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(body);
    }).listen(8082);
});