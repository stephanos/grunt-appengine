var ctx = require('./context.js');

exports.copy = {

  testUpdateApp: function (test) {
    var task = ctx.newTask(['update', 'myapp']);

    var result = task.execute(true);
    test.equals(result.cmd, 'appcfg.py --oauth2 update .');

    test.done();
  },

  testUpdateAppInAnotherDirectory: function (test) {
    var task = ctx.newTask(['update', 'myapp'], {
      root: 'myapp/'
    });

    var result = task.execute(true);
    test.equals(result.cmd, 'appcfg.py --oauth2 update myapp/');

    test.done();
  },

  testUpdateAppWithModule: function (test) {
    var task = ctx.newTask(['update', 'myapp'], {
      modules: ['app.yaml', 'module.yaml']
    });

    var result = task.execute(true);
    test.equals(result.cmd, 'appcfg.py --oauth2 update app.yaml module.yaml');

    test.done();
  },

  testUpdateAppWithMultipleModules: function (test) {
    var task = ctx.newTask(['update', 'myapp'], {
      root: 'app/',
      modules: ['default.yaml', 'mobile.yaml']
    });

    var result = task.execute(true);
    test.equals(result.cmd, 'appcfg.py --oauth2 update app/default.yaml app/mobile.yaml');

    test.done();
  },

  testUpdateIndexes: function (test) {
    var task = ctx.newTask(['update_indexes', 'myapp']);

    var result = task.execute(true);
    test.equals(result.cmd, 'appcfg.py --oauth2 update_indexes .');

    test.done();
  },

  testUpdateWithCustomVersion: function (test) {
    var task = ctx.newTask(['update', 'myapp'], {
      manageFlags: {
        version: '1.0'
      }
    });

    var result = task.execute(true);
    test.equals(result.cmd, 'appcfg.py --version=1-0 --oauth2 update .');

    test.done();
  },

  testUpdateWithCustomApplication: function (test) {
    var task = ctx.newTask(['update', 'myapp'], {
      manageFlags: {
        application: 'myapp'
      }
    });

    var result = task.execute(true);
    test.equals(result.cmd, 'appcfg.py --application=myapp --oauth2 update .');

    test.done();
  },

  testUpdateAppProfile: function (test) {
    var task = ctx.newTask(['update', 'myapp', 'stage'], {
      stage: {
        manageFlags: {
          version: 'stage'
        }
      }
    });

    var result = task.execute(true);
    test.equals(result.cmd, 'appcfg.py --version=stage --oauth2 update .');

    test.done();
  },

  testUpdateAllBackends: function (test) {
    var task = ctx.newTask(['update', 'myapp'], {
      backend: true
    });

    var result = task.execute(true);
    test.equals(result.cmd, 'appcfg.py --oauth2 backends . update');

    test.done();
  },

  testUpdateSingleBackend: function (test) {
    var task = ctx.newTask(['update', 'myapp'], {
      backend: true,
      backendName: 'crawler'
    });

    var result = task.execute(true);
    test.equals(result.cmd, 'appcfg.py --oauth2 backends . update crawler');

    test.done();
  },

  testRunWithCustomGoPath: function (test) {
    var task = ctx.newTask(['update', 'myapp'], {
      myapp: {
        GOPATH: ["mypath"]
      }
    });

    var result = task.execute(true);
    test.notEqual(result, false);
    test.equal(result.opts['env']['GOPATH'].indexOf(':'), -1);
    test.notEqual(result.opts['env']['GOPATH'].indexOf('/mypath'), -1);

    test.done();
  }

};