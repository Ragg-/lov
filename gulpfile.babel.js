const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const webpack = require("webpack");
const path = require("path");

export function stylus() {
    return gulp.src(["static/style/**/*.styl", "!**/*/_*.styl"])
        .pipe($.plumber())
        .pipe($.stylus({
            compress: true,
            use : [require("nib")()]
        }))
        .pipe(gulp.dest("build/style/"));
}

export function copyImages() {
    return gulp.src("static/images/**/*")
        .pipe(gulp.dest("build/images/"));
}

export function copyFonts() {
    return gulp.src("static/fonts/**/*")
        .pipe(gulp.dest("build/fonts"));
}

export function watch() {
    gulp.watch("static/style/**/*.styl", stylus);
    gulp.watch("static/fonts/**/*", copyFonts);
    gulp.watch("static/images/**/*", copyImages);
    gulp.watch("static/js/**/*.js", buildWebpack);
}

const build = gulp.parallel(stylus, copyImages, copyFonts);
const buildWatch = gulp.series(build, watch);

export {build, buildWatch};
export default buildWatch;
