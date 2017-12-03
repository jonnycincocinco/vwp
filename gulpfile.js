var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks-render');
var sass = require('gulp-sass');
var data = require('gulp-data');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(data(function() {
      return require('./src/data.json')
    }))
    .pipe(nunjucks())
    .pipe(gulp.dest('./dist'))
});

gulp.task('sass', function() {
  return gulp.src('src/style.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 4 versions', 'ie >= 9']
  }))
  .pipe(gulp.dest('./dist'))
});

gulp.task('fonts', function () {
  gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('images', function() {
  gulp.src('./src/content/**/*')
    .pipe(gulp.dest('./dist/content'));
})

// gulp.task('fake-img', function() {
//   gulp.src('./src/fake-img/*')
//     .pipe(gulp.dest('./dist/fake-img'));
// })

gulp.task('watch', ['html', 'sass', 'fonts', 'images'], function() {
  gulp.watch(['src/index.html', 'src/data.json'], ['html']);
  gulp.watch('src/style.scss', ['sass']);
  gulp.watch('src/fonts/**/*', ['fonts']);
  gulp.watch('src/content/**/*', ['images']);
})

gulp.task('default', ['html', 'sass', 'fonts', 'images']);
gulp.task('build-prod', ['html', 'sass', 'images']);
