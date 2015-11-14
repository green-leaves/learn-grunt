module.exports = function (grunt) {
    grunt.config.init({
        weather: {
            home: 60623,
            work: 60622
        }
    });

    //http://api.openweathermap.org/data/2.5/weather?zip=60623,us&appid=2de143494c0b295cca9337e1e96b00e0
    grunt.registerMultiTask("weather", "fetches weather", function () {
        var done, http, location, request, requestOptions, zipCode;
        location = this.target;
        zipCode = this.data + ",us";
        requestOptions = {
            host: 'api.openweathermap.org',
            path: '/data/2.5/weather?zip=' + zipCode + '&appid=2de143494c0b295cca9337e1e96b00e0',
            port: 80,
            method: 'GET'
        };
        var http = require('http');
        var done = this.async();
        request = http.request(requestOptions, function (response) {
            var buffer = [];
            response.on('data', function (data) {
                buffer.push(data);
            });

            response.on('end', function () {
                var weather = JSON.parse(buffer.join());
                console.log(location + ' : ' + weather.main.temp + ' degrees');
                done();
            });

            request.end();
        });
    });


}