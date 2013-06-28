
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,

        globals: {
            $: true,
            jQuery: true
        }
      },
      all: ['src/**/*.js']
    },

    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['jshint']
      }
    },

    banner: [
      '/*!',
      ' * <%= pkg.name %>.js <%= pkg.version %>',
      ' * https://github.com/nanlabs/<%= pkg.name %>',
      ' * Date Compiled: <%= grunt.template.today("yyyy-mm-dd") %>',
      ' */\n\n'
    ].join('\n'),

    uglify: {
      options: {
        banner: '<%= banner %>',
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          keepalive: true
        }
      }
    },

    copy: {
      dist: {
        files: [
          {expand: true, cwd: 'css/', src: ['**'], dest: 'dist/'},
          {expand: true, cwd: 'vendor/typeahead.js/dist/', src: ['typeahead.min.js'], dest: 'dist/'}
        ]
      },
      docs: {
        files: [
          {expand: true, cwd: 'dist/', src: ['**'], dest: 'docs/'}
        ]
      }
    }

  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Tasks
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('watch', ['jshint', 'watch']);
  grunt.registerTask('compile', ['uglify', 'copy:dist', 'copy:docs']);
  grunt.registerTask('server', ['connect']);

};