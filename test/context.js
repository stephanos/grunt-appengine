var grunt = require('grunt');
var appengine = require('../tasks/grunt-appengine.js');

module.exports =  {

  newTask: function (taskArgs, gruntOptions) {

    var task = appengine(grunt);

    task.args = taskArgs || [];

    task.options = function (defaultOpts) {
      var res = defaultOpts || {};
      res.runFlags = defaultOpts.runFlags || {};
      res.manageFlags = defaultOpts.manageFlags || {};

      var userOpts = gruntOptions || {};
      userOpts.runFlags = userOpts.runFlags || {};
      userOpts.manageFlags = userOpts.manageFlags || {};

      for (var attrname in userOpts.runFlags) {
        res.runFlags[attrname] = userOpts.runFlags[attrname];
      }
      for (var attrname in userOpts.manageFlags) {
        res.manageFlags[attrname] = userOpts.manageFlags[attrname];
      }

      for (var attrname in userOpts) {
        if (attrname !== "runFlags" && attrname !== "manageFlags") {
          res[attrname] = userOpts[attrname];
        }
      }

      return res;
    };

    /*
    var execute = task.execute
    task.execute = function () {
      execute(function() {
        // do nothing
      })
    };
    */

    return task;
  }
};