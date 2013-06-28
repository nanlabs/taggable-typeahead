
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
    }

  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'watch']);
  grunt.registerTask('compile', ['uglify']);

};