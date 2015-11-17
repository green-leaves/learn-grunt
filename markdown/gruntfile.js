module.exports = function (grunt) {
    grunt.initConfig({
        coffee: {
            app: {
                options: {
                    bare: false
                },
                files: {
                    'tmp/compiled.js': ['coffeescript/app.coffee',
                                        'coffeescript/factories/*.coffee',
                                        'coffeescript/controllers/*.coffee']
                }
            },
        },

        concat: {
            app: {
                src: ['bower_components/angular/angular.js',
                      'bower_components/angular-sanitize/angular-sanitize.js',
                      'bower_components/markdown/dist/markdown.min.js',
                      'tmp/compiled.js'],
                dest: 'tmp/app.js'
            }
        },

        uglify: {
            app: {
                files: {
                    'assets/app.min.js': 'tmp/app.js',
                }
            }
        },

        sass: {
            app: {
                files:{
                    'tmp/app.css': ['sass/style.scss']
                }
            }
        },

        cssmin: {
            app: {
                files: {
                    'assets/app.css': ['tmp/app.css']
                }
            }
        },
    });

    grunt.loadNpmTasks("grunt-contrib-coffee");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-cssmin");

    grunt.registerTask('build', "Builds the application.", ['coffee', 'concat:app', 'sass', 'cssmin', 'uglify' ]);
    grunt.registerTask('default', ['build']);
}