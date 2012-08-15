"use strict";

exports = module.exports = sudo;

var spawn = require('child_process').spawn;
var read = require('read');
var inpathSync = require('inpath').sync;

var path = process.env['PATH'].split(':');
var sudoBin = inpathSync('sudo', path);

var cachedPassword;
var lastAnswer;

function sudo(command, options) {
    var prompt = '#node-sudo-passwd#';
    var prompts = 0;

    var args = [ '-S', '-p', prompt ];
    args.push.apply(args, command);

    var options = options || {};
    var spawnOptions = options.spawnOptions || {};
    spawnOptions.stdio = 'pipe';

    var cp = spawn(sudoBin, args, spawnOptions);
    cp.stderr.on('data', function (data) {
        var lines = data.toString().trim().split('\n');
        lines.forEach(function (line) {
            if (line === prompt) {
                if (++prompts > 1) {
                    // The previous entry must have been incorrect, since sudo asks again.
                    cachedPassword = null;
                }

                if (options.cachePassword && cachedPassword) {
                    cp.stdin.write(cachedPassword + '\n');
                } else {
                    read({ prompt: options.prompt || 'sudo requires your password: ', silent: true }, function (error, answer) {
                        cp.stdin.write(answer + '\n');
                        if (options.cachePassword) {
                            cachedPassword = answer;
                        }
                    });
                }
            }
        });
    });

    return cp;
}

if (require.main === module) {
    preAuth({ cachePassword: true }, function () {
        require('child_process').exec('sudo -k', function () {
            var ls = sudo(['ls'], { cachePassword: true });
            ls.stdout.on('data', console.log);
        });
    });
}

