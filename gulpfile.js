const gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglifyjs'),
  cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  del = require('del'),
  cache = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer'),
  cssScss = require('gulp-css-scss');

gulp.task('default', ['watch']);

gulp.task('sass', () => {
  return gulp
    .src('app/sass/**/*.sass')
    .pipe(sass())
    .pipe(
      autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
        cascade: true,
      })
    )
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('css-scss', () => {
  return gulp
    .src('app/libs/**/*.css')
    .pipe(cssScss())
    .pipe(gulp.dest('app/libs'));
});

gulp.task('css-libs', ['sass'], () => {
  return gulp
    .src('app/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('scripts', () => {
  return gulp
    .src([
      'app/libs/jquery/dist/jquery.min.js',
      'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: 'app',
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

gulp.task('watch', ['browser-sync', 'css-scss', 'css-libs', 'scripts'], () => {
  gulp.watch('app/sass/**/*.sass', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);

gulp.task('build', ['clean', 'sass', 'scripts'], () => {
  gulp
    .src(['app/css/main.css', 'app/css/libs.min.css'])
    .pipe(gulp.dest('dist/css'));

  gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));

  gulp.src('app/js/**/*').pipe(gulp.dest('dist/js'));

  gulp.src('app/*.html').pipe(gulp.dest('dist'));
});
