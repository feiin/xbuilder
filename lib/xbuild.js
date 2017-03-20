const _ = require('lodash');
var spawn = require('child_process').spawn;
const Promise = require('bluebird');

function getXbuildCommand(options) {
    var xbuildOptions = {
        target: '',
        properties: {
            Configuration: 'Release'
        },
        targets:[],
        solutionPath: ''
    }
    _.assign(xbuildOptions, options);

    var exec_command = [];

    for (var p in xbuildOptions.properties) {
        exec_command.push(['/p:', p, '=', xbuildOptions.properties[p]].join(""));
    }

    if(xbuildOptions.target && xbuildOptions.targets.indexOf(xbuildOptions.target) < 0) {
        xbuildOptions.targets.push(xbuildOptions.target);
    }

    xbuildOptions.targets.forEach((item) => {
        exec_command.push('/t:' + item)

    });
    
    exec_command.push(xbuildOptions.solutionPath);
    return exec_command;
}

function xbuilder(options) {

    const commandOptions = getXbuildCommand(options);
    const promise = new Promise((resolve, reject) => {

        var error = null;
        //  console.log(commandOptions);
        const xbuild = spawn('xbuild', commandOptions);
        xbuild.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            if(data.indexOf('MSBUILD: error')>=0) {
                error = new Error(`MSBUILD: error`);
            }
        });

        xbuild.stderr.on('data', (data) => {
            error = new Error(`stderr: ${data}`);
            console.log(`stderr: ${data}`);
        });

        xbuild.on('close', (code) => {
            if (error) {
               return reject(error);
            }
            return resolve(commandOptions);
        });

        xbuild.on('error', (code) => {
            error = new Error('Failed to start building');
        });

    });

    return promise;
}

module.exports = xbuilder;