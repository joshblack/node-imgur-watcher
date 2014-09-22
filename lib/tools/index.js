var proc = require('child_process');

exports.copy = function copy(data) {
    var copyProcess = proc.spawn('pbcopy'); 
    copyProcess.stdin.write(data); 
    copyProcess.stdin.end(); 
}