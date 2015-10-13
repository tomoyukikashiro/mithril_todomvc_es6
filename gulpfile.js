var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var browserify = require('browserify');
var babelify = require('babelify');
var msx = require('gulp-msx');
var eslint = require('gulp-eslint');
var source = require('vinyl-source-stream');
var del = require('del');

const JS_PATH = 'src/js/**/*.js';
const JSX_PATH = 'src/js/msx/**/*.jsx';

gulp.task('reload',function(){
  reload({stream:true});
});

gulp.task('clean', del.bind(null, ['js/*']));

gulp.task('eslint', function () {
    return gulp.src([JS_PATH, JSX_PATH])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task('msx', function() {
  return gulp.src(JSX_PATH)
    .pipe(msx({harmony: true}))
    .pipe(gulp.dest('src/js/views/'))
});

gulp.task('js', function() {
  browserify('src/js/app.js', { debug: true })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('app.js'))
    .pipe(gulp.dest('./js'))
});

gulp.task('build', ['clean', 'eslint','msx', 'js']);

gulp.task('default', ['build'] ,function(){
  browserSync.init({
    server: './'
  });
  gulp.watch('src/js/**/*',['eslint', 'msx', 'js','reload']);
});
