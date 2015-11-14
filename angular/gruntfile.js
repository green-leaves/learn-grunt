module.exports = function (grunt) {
    grunt.config.init({
        build: {
            angular: {
                src: ['bower_components/angular/angular.js',
                      'bower_components/angular-resource/angular-resource.js',
                      'bower_components/angular/index1.js' ],
                dest: 'dist/angular.js'
            },
            angularWithjQuery: {
                src: ['bower_components/jquery/dist/jquery.js' ,
                      'bower_components/angular/angular.js' ,
                      'bower_components/angular-resource/angular-resource.js' ],
                dest: 'dist/jquery-angular.js'
            }
        }
    });

    grunt.registerMultiTask('build', 'Concatenate Files', function () {
        //var output;
        this.files.forEach(function (filegroup) {

            var sources = filegroup.src.filter(function (file) {
                if (grunt.file.exists(file)) {
                    return true;
                } else {
                    grunt.log.writeln("File " + file + " does not exist");
                    return false;
                }
            }).map(function (file) {
                return grunt.file.read(file);
            })

            output = sources.join(';');
            grunt.file.write(filegroup.dest, output);
        })
    });

    grunt.registerTask('clean', function () {
        grunt.file.delete('dist');
    })
}