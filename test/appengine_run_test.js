var ctx = require('./context.js');

exports.copy = {

  testRunDevServer: function (test) {
    var task = ctx.newTask(['myapp', 'run']);

    var result = task.execute(true);
    test.equals(result, 'dev_appserver.py --port=8080 .');

    test.done();
  },

  testRunDevServerInAnotherRoot: function (test) {
    var task = ctx.newTask(['myapp', 'run'], {
      root: "myapp/"
    });

    var result = task.execute(true);
    test.equals(result, 'dev_appserver.py --port=8080 myapp/');

    test.done();
  },

  testRunDevServerWithClearDatastore: function (test) {
    var task = ctx.newTask(['myapp', 'run'], {
      runFlags: {
        clear_datastore: "yes"
      }
    });

    var result = task.execute(true);
    test.equals(result, 'dev_appserver.py --clear_datastore=yes --port=8080 .');

    test.done();
  },

  testRunDevServerWithMail: function (test) {
    var task = ctx.newTask(['myapp', 'run'], {
      runFlags: {
        enable_sendmail: true
      }
    });

    var result = task.execute(true);
    test.equals(result, 'dev_appserver.py --enable_sendmail --port=8080 .');

    test.done();
  },

  testRunDevServerWithBackends: function (test) {
    var task = ctx.newTask(['myapp', 'run'], {
      runFlags: {
        backends: true
      }
    });

    var result = task.execute(true);
    test.equals(result, 'dev_appserver.py --backends --port=8080 .');

    test.done();
  },

  testRunDevServerWithCustomSDK: function (test) {
    var task = ctx.newTask(['myapp', 'run'], {
      sdk: "sdk"
    });

    var result = task.execute(true);
    test.equals(result, 'sdk/dev_appserver.py --port=8080 .');

    test.done();
  }

};