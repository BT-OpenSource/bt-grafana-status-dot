module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: ["dist"],

    copy: {
      src: {
        cwd: 'src',
        expand: true,
        src: ['**/*', '!**/*.scss'],
        dest: 'dist'
      },
      meta: {
        expand: true,
        src: ['README.md'],
        dest: 'dist/README.md'
      }
    },

    watch: {
      rebuild_all: {
        files: ['src/**/*'],
        tasks: ['build']
      },
    },

    babel: {
      options: {
        presets:  ["env"]
      },
      dist: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ['*.js', 'util/*.js'],
          dest: 'dist',
          ext:'.js'
        }]
      },
    }, 

    eslint: {
      target: ['src/*.js', 'src/util/*.js', 'spec']
    },

    exec: {
      jasmine: {
        cmd: 'node_modules/jasmine/bin/jasmine.js'
      }
    }
  });

  grunt.registerTask('test', 'exec:jasmine')
  grunt.registerTask('build', ['clean', 'copy:src', 'copy:meta', 'babel'])
  grunt.registerTask('default', ['eslint', 'test', 'build'])
};
