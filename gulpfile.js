const gulp = require('gulp'),
  sass = require('gulp-sass'),
  wait = require('gulp-wait'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  del = require('del'),
  cache = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer'),
  cssScss = require('gulp-css-scss');

gulp.task('default', ['watch']);

gulp.task('sass', () => {
  return gulp
    .src('src/sass/**/*.sass')
    .pipe(wait(500))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('src/css'));
});

gulp.task('css-scss', () => {
  return gulp
    .src('src/libs/**/*.css')
    .pipe(cssScss())
    .pipe(gulp.dest('src/libs'));
});

gulp.task('scripts', () => {
  return gulp
    .src(['src/libs/jquery/dist/jquery.min.js'])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'));
});

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: 'src',
    },
    notify: false,
  });
});

gulp.task('clean', () => {
  return del.sync('dist');
});

gulp.task('clear', () => {
  return cache.clearAll();
});

gulp.task('watch', ['browser-sync', 'sass', 'css-scss', 'scripts'], () => {
  gulp.watch('src/sass/**/*.sass', ['sass', browserSync.reload]);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'sass', 'scripts'], () => {
  gulp
    .src('src/css/**/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));

  gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));

  gulp.src('src/js/**/*').pipe(gulp.dest('dist/js'));

  gulp.src('src/*.html').pipe(gulp.dest('dist'));
});
