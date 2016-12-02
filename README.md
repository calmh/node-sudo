# This project is not actively maintained

Issues and pull requests on this repository may not be acted on in a timely
manner, or at all.  You are of course welcome to use it anyway. You are even
more welcome to fork it and maintain the results.

![Unmaintained](https://nym.se/img/unmaintained.jpg)

node-sudo
=========

A `child_process.spawn` but with `sudo` in between. The `sudo` password dialog
is abstracted away so that the calling Node script can interact with the
program that is run under `sudo` without worrying about it.

Synopsis
--------

```javascript
sudo(args, options)
```

 - `args`: An array of arguments to `sudo`. Can be both options (such as `-v`
   or `-E`) and the program to run. Example: `['ls']`.

 - `options`: An optional object containing options. Recognized options are:

    - `password`: String; sudo password.

    - `cachePassword`: Boolean; whether to remember the password between
      invocations or not.

    - `prompt`: String; what to display to the user when the password is
      needed.

    - `spawnOptions`: Object; passed on directly to `spawn`. `stdio` or
      `customFds` will be overwritten.

Example
-------

```javascript
var sudo = require('sudo');
var options = {
    cachePassword: true,
    prompt: 'Password, yo? ',
    spawnOptions: { /* other options for spawn */ }
};
var child = sudo([ 'ls', '-l', '/tmp' ], options);
child.stdout.on('data', function (data) {
    console.log(data.toString());
});
```

License
-------

MIT
