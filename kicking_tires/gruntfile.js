module.exports = function (grunt) {

    grunt.registerTask("default", function () {
        grunt.log.writeln("Hello World");
    });

    grunt.registerTask("greet", function (name) {
        grunt.log.writeln("Hi there, " + name);
    });

    grunt.registerTask( 'addNumbers' , function(first, second){
        if(isNaN(Number(first))){
            grunt.warn( 'The first argument must be a number.' );
        }
        var answer = Number(first) + Number(second);
        grunt.log.writeln(first + ' + ' + second + ' is ' + answer);
    });

    grunt.registerTask('all', ['default', 'greet:Brian', 'addNumbers:33:22']);

    grunt.registerTask( 'praise' ,
        'Have Grunt say nice things about you.' , function() {
            var praise = [
                "You're awesome." ,
                "You're the best developer ever!" ,
                "You are extremely attractive." ,
                "Everyone loves you!"
            ]
            var pick = praise[(Math.floor(Math.random() * praise.length))];
            grunt.log.writeln(pick);
        }
    );

}