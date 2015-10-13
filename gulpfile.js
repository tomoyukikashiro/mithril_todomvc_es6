var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
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

gulp.task('js:vendor', function() {
  gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/materialize-css/bin/materialize.js',
    'node_modules/todomvc-common/base.js',
    'node_modules/mithril/mithril.js'
    ])
    .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('js/'));
});

gulp.task('js:app', function() {
  browserify('src/js/app.js', { debug: true })
    .exclude('jquery', 'materialize-css', 'mithril')
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('app.js'))
    .pipe(gulp.dest('./js'))
});

gulp.task('build', ['clean', 'eslint','msx', 'js:vendor', 'js:app']);

gulp.task('default', ['build'] ,function(){
  browserSync.init({
    server: './'
  });
  gulp.watch('src/js/**/*',['eslint', 'msx', 'js:app','reload']);
});
