// Initialize modules
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');


// File paths
const files = {
    scssPath: 'source/scss/**/*.scss',
    jsPath: 'source/js/**/*.js',
    htmlPath: 'source/templates/**/*.html',
    pngimagesPath: 'source/images/**/*.png',
    jpgimagesPath: 'source/images/**/*.jpg',

}

// Sass task: compiles the style.scss file into style.css
function scssTask(){
    return src(files.scssPath)
        .pipe(sass()) // compile SCSS to CSS
        .pipe(dest('dist')
    );
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask(){
    return src([
        files.jsPath
        ])
        .pipe(dest('dist')
    );
}

// htmltask
function htmlTask(){
    return src(files.htmlPath)
        .pipe(htmlmin())
        .pipe(dest('dist')
    );
}

// png imagestask
function pngimagesTask(){
    return src(files.pngimagesPath)
        .pipe(imagemin()) // compile SCSS to CSS
        .pipe(dest('dist')
    );
}

// jpg imagestask
function jpimagesTask(){
    return src(files.jpgimagesPath)
        .pipe(imagemin()) // compile SCSS to CSS
        .pipe(dest('dist')
    );
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){
    watch([files.scssPath, files.jsPath, files.htmlPath, files.pngimagesPath, files.jpgimagesPath],
        {interval: 1000, usePolling: true}, //Makes docker work
        series(
            parallel(scssTask, jsTask, htmlTask, pngimagesTask, jpimagesTask)
        )
    );
}

//exports.pngimagesTask=pngimagesTask;
//exports.scssTask=scssTask;
//exports.watch = watch;

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    parallel(scssTask, jsTask, htmlTask, pngimagesTask, jpimagesTask),
    watchTask
);