
var child_process = {
    exec: (command,cb) => {
        cb(null,command,null);
    }
}

module.exports = child_process;