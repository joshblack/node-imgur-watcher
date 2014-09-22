var imgur = require('../imgur');
var tools = require('../tools');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var eventsEmitter = new EventEmitter();

var fileTypes = {
    'gif': imgur.upload,
    'png': imgur.upload,
    'mov': imgur.transform,
    'jpg': imgur.upload
};

exports.types = ['png', 'gif', 'mov', 'jpg'];

exports.upload = function upload(type, file) {
    var prepareUpload = fileTypes[type],
        fileUpload = prepareUpload(file);

    fileUpload.then(function(data) {
        if (data !== 'transformed') {
            // console.log('The link for your upload file has been copied to your clipboard');
            eventsEmitter.emit('linkCopied', file, data);
            tools.copy(data);

            fs.unlink(file, function(err) {
                if (err) throw err;
            });
        } else {
            eventsEmitter.emit('mediaTransform');
        }
    });

    fileUpload.catch(function(err) {
        console.log('file upload error thrown');
        console.log(err);
    });
};

exports.eventsEmitter = eventsEmitter;