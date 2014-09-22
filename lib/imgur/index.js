var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');
var options = require('./config').options;
var exec = require('child_process').exec;

exports.upload = function upload(file) {
    return new Promise(function(resolve, reject) {
        var fileStream = fs.createReadStream(file);

        fileStream.pipe(request(options, function(err, res, body) {
            var body = JSON.parse(body);

            (!err && body.status == 200) ? resolve(body.data.link) : reject(err);
        }));    
    });
};

exports.transform = function transform(file) {
    return new Promise(function(resolve, reject) {
        exec('gifify ' + file, function(err, stdout, stdin) {
            if (err) reject(err);

            fs.unlink(file, function(err) {
                if (err) throw err;
            });

            resolve('transformed');
        });
    });
};