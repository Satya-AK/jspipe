'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-es6-module-transpiler');

    grunt.initConfig({
        regenerator: {
            jspipe: {
                options: {
                    files: [ { src: 'src/jspipe.js', dest: 'tmp/jspipe.js' } ],
                    regeneratorOptions: {
                        includeRuntime: false
                    }
                }
            },

            demos: {
                options: {
                    files: [
                        { src: 'demos/web/autocomplete.js', dest: 'demos/web/autocomplete.es5.js' },
                        { src: 'demos/web/jobWaitsForAnother.js', dest: 'demos/web/jobWaitsForAnother.es5.js' },
                        { src: 'demos/web/select.js', dest: 'demos/web/select.es5.js' },
                        { src: 'demos/web/simultaneous-processes.js', dest: 'demos/web/simultaneous-processes.es5.js' }
                             
                    ],
                    regeneratorOptions: {
                        includeRuntime: false
                    }
                }
            }

        },

        jshint: {
            options: {
                esnext: true
            },

            all: ['src/**/*.js']
        },


        transpile: {

            commonjs: {
                type: 'cjs',
                files: [{ src: ['tmp/jspipe.js'],
                          dest: 'dist-es5/commonjs/jspipe.js' },

                        { src: ['src/jspipe.js'],
                          dest: 'dist-es6/commonjs/jspipe.js' }]
            },

            amd: {
                type: 'amd',
                files: [
                    {
                        expand: true,
                        cwd: 'tmp/',
                        src: ['**/*.js'],
                        dest: 'dist-es5/amd/'
                    },
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['**/*.js'],
                        dest: 'dist-es6/amd/'
                    }
                ]
            }
        },

        browser: {
            es5: {
                options: {
                    src: ['tmp/jspipe.js'],
                    dest: 'dist-es5/jspipe.js',
                    namespace: 'JSPipe'
                }
            },

            es6: {
                options: {
                    src: ['src/jspipe.js'],
                    dest: 'dist-es6/jspipe.js',
                    namespace: 'JSPipe'
                }
            }
        },

        createGeneratorRuntime: {
            options: {
                dest: 'dist-es5/generator-runtime.js'
            }
        },

        jasmine: {
            src: './dist-es5/jspipe.js',
            options: {
                specs: './spec/*-spec.js'
            }
        },


        watch: {
            files: ['./src/**/*.js'],
            tasks: ['build']
        }

    });

    // Registers and loads tasks
    grunt.loadTasks('tasks');

    grunt.registerTask('build', ['jshint',
                                   'ensureBuildDirectories',
                                   'regenerator',
                                   'createGeneratorRuntime',
                                   'browser',
                                   'transpile'
                                ]);



    grunt.registerTask('dev', ['build', 'watch']);
    
    grunt.registerTask('default', ['build']);
};
