node-sudo
=========

A `child_process.spawn` but with `sudo` in between. The `sudo` password dialog
is abstracted away so that the calling Node script can interact with the
program that is run under `sudo` without worrying about it.

If the `cachePassword: true` option is set, the password as entered by the user
will be cached for the duration of the script and resent to `sudo` if required.

Example
-------

```javascript
var sudo = require('sudo');
var options = { cachePassword: true, spawnOptions: { /* other options for spawn */ } };
var child = sudo([ 'ls', '-l', '/tmp' ], options);
child.stdout.on('data', function (data) {
    console.log(data.toString());
});
```

License
-------

MIT
