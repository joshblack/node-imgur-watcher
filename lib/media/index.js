var imgur = require('../imgur');
var tools = require('../tools');
var fs = require('fs');

var fileTypes = {
    'gif': imgur.upload,
    'png': imgur.upload,
    'mov': imgur.transform,
    'jpg': imgur.upload
};

exports.upload = function upload(type, path) {
    var prepareUpload = fileTypes[type],
        fileUpload = prepareUpload(path);

    fileUpload.then(function(data) {
        if (data !== 'transformed') {
            console.log('The link for your upload file has been copied to your clipboard');
            tools.copy(data);

            fs.unlink(path, function(err) {
                if (err) throw err;
            });
        }
    });

    fileUpload.catch(function(err) {
        console.log(err);
    });
};

