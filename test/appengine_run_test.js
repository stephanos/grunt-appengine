var ctx = require('./context.js');

exports.copy = {

  testRunDevServer: function (test) {
    var task = ctx.newTask(['run', 'myapp']);

    var result = task.execute(true);
    test.equals(result.cmd, 'dev_appserver.py .');

    test.done();
  },

  testRunDevServerInAnotherRoot: function (test) {
    var task = ctx.newTask(['run', 'myapp'], {
      root: 'myapp/'
    });

    var result = task.execute(true);
    test.equals(result.cmd, 'dev_appserver.py myapp/');

    test.done();
  },

  testRunDevServerWithModules: function (test) {
    var task = ctx.newTask(['run', 'myapp'], {
      root: 'app',
      modules: ['default.yaml', 'mobile.yaml']
    });

    var result = task.execute(true);
    test.equals(result.cmd, 'dev_appserver.py app/app.yaml app/default.yaml app/mobile.yaml');

    test.done();
  },

  testRunDevServerWithClearDatastore: function (test) {
    var task = ctx.newTask(['run', 'myapp'], {
      runFlags: {
        clear_datastore: 'yes'
      }
    });

    var result = task.execute(true);
    test.equals(result.cmd, 'dev_appserver.py --clear_datastore=yes .');

    test.done();
  },

  testRunDevServerWithMail: function (test) {
    var task = ctx.newTask(['run', 'myapp'], {
      runFlags: {
        enable_sendmail: true
      }
    });

    var result = task.execute(true);
    test.equals(result.cmd, 'dev_appserver.py --enable_sendmail .');

    test.done();
  },

  testRunDevServerWithBackends: function (test) {
    var task = ctx.newTask(['run', 'myapp'], {
      runFlags: {
        backends: true
      }
    });

    var result = task.execute(true);
    test.equals(result.cmd, 'dev_appserver.py --backends .');

    test.done();
  },

  testRunDevServerWithCustomSDK: function (test) {
    var task = ctx.newTask(['run', 'myapp'], {
      sdk: 'sdk'
    });

    var result = task.execute(true);
    test.equals(result.cmd, 'sdk/dev_appserver.py .');

    test.done();
  },

  testRunDevServerWithCustomEnv: function (test) {
    var task = ctx.newTask(['run', 'myapp'], {
      env: {
        PATH: 'MYPATH'
      }
    });

    var result = task.execute(true);
    test.equals(result.opts['env']['PATH'], 'MYPATH');

    test.done();
  },

  testRunDevServerWithCustomStdio: function (test) {
    var task = ctx.newTask(['run', 'myapp'], {
      stdio: 'pipe'
    });

    var result = task.execute(true);
    test.equals(result.opts.stdio, 'pipe');

    test.done();
  }

};