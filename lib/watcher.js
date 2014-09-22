var chokidar = require('chokidar');
var media = require('./media');
var path = require('path');

exports.watch = function watch(dir) {

    var watcher = chokidar.watch(dir, {
        ignored: /[\/\\]\./,
        persistent: true,
        ignoreInitial: true
    });

    watcher.on('add', function(path) {
        console.log('File ' + path + ' has been added');

        // Check to see if we have a valid file type
        var fileType = validFileType(path);

        // If it is a valid file type, let's try and upload it
        if (fileType) media.upload(fileType, path);
    });

    watcher.on('error', function(err) {
        console.error('Error happened ' + err);
    });
};

/**
 * Check to see if the file at a given path is valid to upload
 * @param  {string} path The path to the file
 * @return {string}      Returns the file type if it is valid, otherwise it's an empty string
 */
function validFileType(file) {
    var ext = path.extname(file || '').split('.'),
        fileType = ext[ext.length - 1],
        validTypes = ['png', 'gif', 'mov', 'jpg'];

    return validTypes.reduce(function(prev, curr) {
        return curr === fileType ? curr : prev;
    }, "");
};