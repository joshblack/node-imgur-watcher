var monitor = require('./lib/monitor');
var eventsEmitter = monitor.eventsEmitter;
var Watcher = monitor.Watcher;
var watcher = new Watcher('/Users/joshblack/Desktop');

exports.close = function close() {
    watcher.close();
};

exports.watch = function watch(dir) {
    watcher.watch(dir);
}

exports.eventsEmitter = eventsEmitter;