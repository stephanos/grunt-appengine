'use strict';

module.exports = function (grunt) {

  var defaultOpts = {
    directory: ".",

    manageScript: 'appcfg.py',
    manageFlags: {
      oauth2: true
    },

    runScript: 'dev_appserver.py',
    runFlags: {
      port: 8080
    }
  };

  function spawned(cmd, args) {
    function spawnFunc() {
      var spawn = require('child_process').spawn;
      var PIPE = {stdio: 'inherit'};
      /*jshint validthis:true */
      var done = this.async();
      spawn(cmd, args || [], PIPE).on('exit', function (status) {
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

  function validateOpts(opts) {
    return true;
  }

  // ==== INTERFACE

  var exports = {
    execute: function () {

      // ==== read task parameters

      var taskArgs = this.args || [];
      if (validateArgs(taskArgs) === false) {
        return false;
      }
      var action = taskArgs[1];

      var taskOpts = this.options(defaultOpts);
      if (validateOpts(taskOpts) === false) {
        return false;
      }
      var appdir = taskOpts["directory"];


      // ==== assemble script name

      var cmd = taskOpts['manageScript'];
      var optsFlags = taskOpts['manageFlags'];

      if (action === 'run') {
        cmd = taskOpts['runScript'];
        optsFlags = taskOpts['runFlags'];
      }


      // ==== assemble script action

      var cmdAction = [];
      if (taskOpts["backend"] === true) {
        cmdAction.push("backends");
        cmdAction.push(appdir);
        cmdAction.push(action);

        var backendName = taskOpts["backendName"];
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
      for (var attrname in optsFlags) {
        var attrval = optsFlags[attrname];
        if (attrval === true) {
          cmdFlags.push('--' + attrname);
        } else {
          cmdFlags.push('--' + attrname + "=" + attrval);
        }
      }


      // ==== execute and return

      var cmdArgs = cmdFlags.concat(cmdAction);
      this.command(cmd, cmdArgs);

      grunt.log.writeln();
      return cmd + ' ' + cmdArgs.join(' ');
    },

    command: function (cmd, args) {
      spawned(cmd, args);
    }
  };


  // ==== TASK

  grunt.registerTask('appengine', 'Managing App Engine.', exports.execute);


  return exports;
};
