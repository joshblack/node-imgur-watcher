var chokidar = require('chokidar');
var media = require('./media');
var path = require('path');
var eventsEmitter = media.eventsEmitter;

exports.eventsEmitter = eventsEmitter;
exports.Watcher = Watcher;

function Watcher(dir) {
    this.watcher;
    this.watch(dir);
};

/**
 * Watch a given directory for file changes
 * @param  {path} dir   Path to the directory
 * @return {void}
 */
Watcher.prototype.watch = function watch(dir) {
    if (this.watcher) {
        this.close();
    }

    this.watcher = chokidar.watch(dir, {
        ignored: /[\/\\]\./,
        persistent: true,
        ignoreInitial: true
    });

    this.watcher.on('add', function(file) {
        eventsEmitter.emit('fileAdded', file);

        // Check to see if we have a valid file type
        var fileType = validFileType(file);

        // If it is a valid file type, let's try and upload it
        if (fileType) media.upload(fileType, file);
    });

    this.watcher.on('error', function(err) {
        eventsEmitter.emit('error', err);
    });
}

/**
 * Remove all event listeners from the current watcher
 * @return {FSWatcher}      The current FSWatcher
 */
Watcher.prototype.close = function close() {
    return this.watcher.close();
}

/**
 * Check to see if the file at a given path is valid to upload
 * @param  {string} path The path to the file
 * @return {string}      Returns the file type if it is valid, otherwise it's an empty string
 */
function validFileType(file) {
    var ext = path.extname(file || '').split('.'),
        fileType = ext[ext.length - 1],
        validTypes = media.types;

    return validTypes.reduce(function(prev, curr) {
        return curr === fileType ? curr : prev;
    }, "");
};