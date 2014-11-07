'use_strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        push: false,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: {
        files: {
          src: ['src/**/*.js']
        },
      }
    },
    ngtemplates:  {
      notify:      {
        src:      'src/**/*.html',
        dest:     'dist/ez-notify-tpl.js',
        options: {
          module: 'ez.notify',
          url: function(url) {
            return url.replace('src/', '');
          }
        }
      }
    },
    uglify: {
      options: {
        mangle: true,
        compile: true,
        compress: true
      },
      dist: {
        files: {
          'dist/ez-notify.min.js': ['src/**/*.js'],
          'dist/ez-notify-tpl.js': 'dist/ez-notify-tpl.js'
        }
      }
    },
    watch: {
      all: {
        files: ['Gruntfile.js', 'src/**/*'],
        tasks: ['default'],
        options: {
          livereload: 1676,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-angular-templates');

  grunt.registerTask('default', ['jshint', 'ngtemplates', 'uglify']);
};
