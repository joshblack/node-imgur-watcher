var watcher = require('./lib/watcher');

exports.watch = function(dir) {
    watcher.watch(dir);
};