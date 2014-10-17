module.exports = function (grunt) {
    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        constants: {
            baseDir: 'public/js',
            distDir: 'public/dist',
        },
        shell: {
            start: {
                command: 'npm start'
            },
            test: {
                command: 'npm test'
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: '<%=constants.baseDir%>/lib',
                    layout: 'byType',
                    install: true,
                    verbose: false,
                    cleanTargetDir: true,
                    cleanBowerDir: false
                }
            }
        },
        // Watches files for changes and runs tasks based on the changed files
        watch: {
            src: {
                options: {
                   livereload: true
                },
                tasks: ['jshint', 'concat'],
                files: ['public/**/*.html', 'public/js/**/*.js']
            }
        },
        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
                ignores: []
            },
            all: ['Gruntfile.js', '<%=constants.baseDir%>/{,*/}*.js']
        },
        concat: {
            main: {
                dest: "<%=constants.distDir%>/shumi.alarm.main.js",
                src: [
                    "<%=constants.baseDir%>/lib/angular/angular.js",
                    "<%=constants.baseDir%>/lib/angular-animate/angular-animate.js",
                    "<%=constants.baseDir%>/lib/hammerjs/hammer.js",
                    "<%=constants.baseDir%>/lib/angular-material/angular-material.js",
                    "<%=constants.baseDir%>/lib/angular-resource/angular-resource.js",
                    "<%=constants.baseDir%>/lib/angular-route/angular-route.js",
                    "<%=constants.baseDir%>/lib/angular-aria/angular-aria.js",
                    "<%=constants.baseDir%>/lib/angular-facebook/angular-facebook.js",
                    "<%=constants.baseDir%>/shumi/alarm/controllers/controllers.js",
                    "<%=constants.baseDir%>/shumi/alarm/controllers/authController.js",
                    "<%=constants.baseDir%>/shumi/alarm/directives/directives.js",
                    "<%=constants.baseDir%>/shumi/alarm/filters/filters.js",
                    "<%=constants.baseDir%>/shumi/alarm/services/services.js",
                    "<%=constants.baseDir%>/shumi/alarm/main.js"
                ]
            }
        },
        uglify: {
            target: {
                files: {
                    "<%=constants.distDir%>/min/shumi.alarm.main.js": ["<%= concat.main.dest %>"]
                }
            }
        },
    });

    grunt.registerTask('default', [
        'jshint',
        'concat',
        'watch'
    ]);

    grunt.registerTask('server', [
        'shell:start'
    ]);

    grunt.registerTask('product', [
        'bower:install',
        'jshint',
        'concat',
        'uglify'
    ]);

    grunt.registerTask('test', [
        'shell:test'
    ]);
};
