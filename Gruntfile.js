module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    clean: ['dist'],

    copy: {
      src: {
        cwd: 'src',
        expand: true,
        src: ['**/*'],
        dest: 'dist'
      },
      meta: {
        expand: true,
        src: ['README.md'],
        dest: 'dist'
      }
    },

    watch: {
      src: {
        files: ['src/**/*'],
        tasks: ['build']
      }
    },

    babel: {
      src: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ['**/*.js'],
          dest: 'dist'
        }]
      }
    },

    eslint: {
      src: {
        files: [{
          src: ['src/*.js', 'src/util/*.js']
        },
        {
          cwd: 'spec'
        }]
      }
    },

    exec: {
      jasmine: {
        cmd: 'node_modules/jasmine/bin/jasmine.js'
      }
    }
  })

  grunt.registerTask('test', 'exec:jasmine')
  grunt.registerTask('build', ['clean', 'copy', 'babel'])
  grunt.registerTask('default', ['eslint', 'test', 'build'])
}
