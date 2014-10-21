/*********************
说明：文件结构基于 HTML5Boilerplate:

+ index.html

- css
  + main.css

- js
  - vendor
  + main.js

+ img/

***************************/

/*global module:false*/
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        csslint: {
            /* 检查 CSS 语法 */
            src: ['css/**/*.css']
        },
        jshint: {
            /* 检查 js 语法 */
            all: ['Gruntfile.js', 'js/main.js', 'js/lib/*.js']
        },
        cssmin: {
            /*压缩 CSS 文件为 .min.css */
            options: {
                keepSpecialComments: 0 /* 移除 CSS 文件中的所有注释 */
            },
            minify: {
                expand: true,
                cwd: 'css/',
                src: ['all.css'],
                dest: 'css/',
                ext: '.min.css'
            }
        },
        uglify: {
            /* 最小化、混淆、合并 JavaScript 文件 */
            target: {
                files: {
                    'js/all.min.js': ['js/all.js']
                }
            },
            minjs: { //最小化、混淆所有 js/ 目录下的 JavaScript 文件
                files: [{
                    expand: true,
                    cwd: 'js/',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: 'js/',
                    ext: '.min.js'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 定义默认任务
    grunt.registerTask('default', ['csslint', 'jshint', 'cssmin', 'uglify']);
    grunt.registerTask('css', ['cssmin']);
    grunt.registerTask('dev', ['csslint', 'jshint']);
    grunt.registerTask('dest', ['cssmin', 'uglify:minjs']);
};