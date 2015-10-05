var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync');

var paths = {
    "less": ["components/**/*.less", "static/less/*.less"],
};

gulp.task('less', function () {
    gulp.src('static/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./static/css'));

    gulp.src('components/rank/rank.less')
    .pipe(less())
    .pipe(gulp.dest('./components/rank'));

    gulp.src('components/card/card.less')
    .pipe(less())
    .pipe(gulp.dest('./components/card'));

    gulp.src('components/award-box/award-box.less')
    .pipe(less())
    .pipe(gulp.dest('./components/award-box'));

    gulp.src('components/info/info.less')
    .pipe(less())
    .pipe(gulp.dest('./components/info'));

    gulp.src('components/award-card/award-card.less')
    .pipe(less())
    .pipe(gulp.dest('./components/award-card'));

    gulp.src('components/word/word.less')
    .pipe(less())
    .pipe(gulp.dest('./components/word'));
    
});

gulp.task('watch', function () {
    gulp.watch(paths.less, ['less']);
});

gulp.task('browserSync', function() {
    browserSync({
      files: ['', '*.html', 'static/css/*.css', 'components/**/*.*', 'components/**/*.css'],
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('serve', ['browserSync', 'watch']);

