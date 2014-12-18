module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      compass: {
        files: ['src/styles/*.scss'],
        tasks: ['compass:dist']
      },
      concat: {
        files: ['src/js/*.js'],
        tasks: ['concat:dist']
      },
      imagemin: {
        files: ['src/images/*.{png,jpg,gif}'],
        tasks: ['imagemin:dynamic']
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: 'src/styles/',
        cssDir: 'www/css/',
        relativeAssets: false,
        assetCacheBuster: false,
        outputStyle: 'expanded',
        noLineComments: false
      },
      dist: {
        options: {
          noLineComments: true
        }
      }
    },

    concat: {
      options: {
        separator: grunt.util.linefeed + grunt.util.linefeed,
        banner:  '/* Build <%= grunt.template.today("yyyy-mm-dd") %> */' + grunt.util.linefeed + '(function() {"use-strict";' + grunt.util.linefeed + grunt.util.linefeed,
        footer: grunt.util.linefeed + grunt.util.linefeed + '})();'
      },
      dist: {
        src: ['src/js/*.js'],
        dest: 'www/js/crispin-mulberry.js',
      },
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/images/',
          src: ['*.{jpg,png}'],
          dest: 'www/images/'
        }]
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'www/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.min.css'
      }
    },

    uglify: {
      options: {
        banner: '/* Build <%= grunt.template.today("yyyy-mm-dd") %> */' + grunt.util.linefeed + '(function() {"use-strict";' + grunt.util.linefeed + grunt.util.linefeed,
        footer: grunt.util.linefeed + grunt.util.linefeed + '})();'
      },
      my_target: {
        files: {
          'dist/output.min.js': 'src/js/*.js'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', [
    'concat:dist',
    'compass:dist',
    'imagemin'
  ]);

  grunt.registerTask('dist', [
    'concat:dist',
    'compass:dist',
    'imagemin',
    'cssmin',
    'uglify'
  ]);

};