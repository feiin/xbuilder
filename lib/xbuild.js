const _ = require('lodash');
var exec = require('child_process').exec;
const Promise = require('bluebird');

function getXbuildCommand(options) {
    var xbuildOptions = {
        target:'build',
        properties: {
            Configuration:'Release'
        },
        solutionPath:''
    }
    _.assign(xbuildOptions, options);

    var exec_command = ['xbuild'];

    for (var p in xbuildOptions.properties) {
         exec_command.push(['/p:', p, '=', xbuildOptions.properties[p]].join(""));
    }
    if(xbuildOptions.target) {
        exec_command.push('/target:'+xbuildOptions.target)
    }
    exec_command.push(xbuildOptions.solutionPath);
    return exec_command.join(' ');
}

function xbuilder(options, cb) {
    var command = getXbuildCommand(options);
    var run = Promise.promisify(exec, {multiArgs:true});

    return run(command);
}

module.exports = xbuilder;