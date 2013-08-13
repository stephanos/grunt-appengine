'use strict';

module.exports = function (grunt) {

  var _ = grunt.util._;

  var defaultOpts = {
    root: '.',

    manageScript: 'appcfg.py',
    manageFlags: {
      oauth2: true
    },

    runScript: 'dev_appserver.py',
    runFlags: {
      port: 8080
    }
  };

  function spawned(done, cmd, args, opts) {
    function spawnFunc() {
      var spawn = require('child_process').spawn;
      opts.stdio = 'inherit';
      spawn(cmd, args || [], opts).on('exit', function (status) {
        done(status === 0);
      });
    }

    return spawnFunc;
  }

  // expecting 'appengine:<app>:<command>'
  function validateArgs(args) {
    if (args.length === 0) {
      grunt.log.error('Unable to run task: no target specified');
      return false;
    } else if (args.length === 1) {
      grunt.log.error('Unable to run task: no action specified (e.g. run or update)');
      return false;
    } else if (args.length > 2) {
      grunt.log.error('Unable to run task: too many arguments (up to 3 allowed)');
      return false;
    }

    return true;
  }

  // ==== INTERFACE

  var exports = {
    execute: function (dryRun) {
      var self = this;
      var name = self.name || 'appengine';


      // ==== read task parameters

      var taskArgs = this.args || [];
      grunt.log.debug('args: ' + taskArgs);
      if (validateArgs(taskArgs) === false) {
        return false;
      }
      var target = taskArgs[0];
      var action = taskArgs[1];

      var taskOpts = _.defaults(
        grunt.config([name, target, 'options']) || {},
        grunt.config([name, 'options']) || {},
        defaultOpts
      );
      grunt.log.debug('opts: ' + JSON.stringify(taskOpts));
      var appdir = taskOpts['root'];


      // ==== assemble script name

      var cmd = taskOpts['manageScript'];
      var optsFlagsName = 'manageFlags';

      if (action === 'run') {
        cmd = taskOpts['runScript'];
        optsFlagsName = 'runFlags';
      }
      var taskFlagsOpts = _.defaults(
        (grunt.config([name, target, 'options']) || {})[optsFlagsName] || {},
        (grunt.config([name, 'options']) || {})[optsFlagsName] || {},
        defaultOpts[optsFlagsName]
      );

      var sdk = taskOpts['sdk'];
      if (sdk) {
        cmd = sdk + '/' + cmd;
      }


      // ==== assemble script action

      var cmdAction = [];
      if (taskOpts['backend'] === true) {
        cmdAction.push('backends');
        cmdAction.push(appdir);
        cmdAction.push(action);

        var backendName = taskOpts['backendName'];
        if (backendName) {
          cmdAction.push(backendName);
        }
      } else {
        if (action !== 'run') {
          cmdAction.push(action);
        }
        cmdAction.push(appdir);
      }


      // ==== assemble script flags

      var cmdFlags = [];
      for (var attrname in taskFlagsOpts) {
        var attrval = taskFlagsOpts[attrname];
        if (attrval === true) {
          cmdFlags.push('--' + attrname);
        } else {
          cmdFlags.push('--' + attrname + '=' + attrval);
        }
      }


      // ==== assemble script process opts

      var cmdOpts = {};
      cmdOpts['env'] = process.env || {};

      var envTaskOpts = taskOpts['env'] || {};
      for (var envName in envTaskOpts) {
        cmdOpts['env'][envName] = envTaskOpts[envName];
      }


      // ==== execute and return

      var cmdArgs = cmdFlags.concat(cmdAction);
      var fullCmd = cmd + ' ' + cmdArgs.join(' ');
      grunt.log.writeln('executing: ' + fullCmd);

      if (dryRun !== true) {
        var done = this.async();
        spawned(done, cmd, cmdArgs, cmdOpts)();
      } else {
        grunt.log.write('(dry run: script not executed)');
      }

      grunt.log.writeln();

      return {
        cmd: fullCmd,
        opts: cmdOpts
      };
    }
  };


  // ==== TASK

  grunt.registerTask('appengine', 'Managing App Engine.', exports.execute);


  return exports;
};
