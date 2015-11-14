module.exports = function (grunt) {
    grunt.config.init({
        copyFiles: {
            options: {
                workingDirectory: 'working',
                manifest: ['index.html', 'stylesheets/', 'javascripts/'],
            }
        },

        pkg: grunt.file.readJSON('package.json'),
    });

    grunt.registerTask('create', 'Create the working folder', function () {
        grunt.config.requires('copyFiles.options.workingDirectory');
        grunt.file.mkdir(grunt.config.get('copyFiles.options.workingDirectory'));
    })

    grunt.registerTask('clean', 'Delete the working folder and its content', function () {
        grunt.config.requires('copyFiles.options.workingDirectory');
        grunt.file.delete(grunt.config.get('copyFiles.options.workingDirectory'));
    })

    grunt.registerTask('copy', 'Copy files to working folder', function () {
        grunt.config.requires('copyFiles.options.workingDirectory');
        grunt.config.requires('copyFiles.options.manifest');
        this.requires('clean');

        var files = grunt.config.get('copyFiles.options.manifest');
        var workingDir = grunt.config.get('copyFiles.options.workingDirectory');

        files.forEach(function (item) {
            recursiveCopy(item, workingDir);
        });


    })

    grunt.registerTask('version', function () {
        this.requires('copy');
        var content = grunt.template.process('<%=pkg.name %> version <%= pkg.version %>');
        var workingDir = grunt.template.process('<%= copyFiles.options.workingDirectory %>');
        grunt.file.write(workingDir + '/version.txt' , content);
    })

    grunt.registerTask('deploy', 'deploys files' , ['clean', 'create', 'copy', 'version']);

    function recursiveCopy(source, destination) {
        if (grunt.file.isDir(source)) {
            grunt.file.recurse(source, function (file) {
                recursiveCopy(file, destination);
            });
        } else {
            grunt.log.writeln("Copying " + source + " to " + destination);
            grunt.file.copy(source, destination + '/' + source);
        }
    }
}