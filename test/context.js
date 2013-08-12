var grunt = require('grunt');
var appengine = require('../tasks/grunt-appengine.js');

module.exports =  {

  newTask: function (taskArgs, gruntOptions) {

    var task = appengine(grunt);

    task.args = taskArgs || [];

    grunt.config = function () {
      return gruntOptions;
    };

    return task;
  }
};