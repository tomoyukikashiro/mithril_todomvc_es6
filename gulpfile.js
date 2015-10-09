var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var del = require('del');

gulp.task('reload',function(){
  reload({stream:true});
});

gulp.task('clean', del.bind(null, ['js/*']));

gulp.task('js', function() {
  browserify('src/js/app.js', { debug: true })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('app.js'))
    .pipe(gulp.dest('./js'))
});

gulp.task('build', ['clean', 'js']);

gulp.task('default', ['build'] ,function(){
  browserSync.init({
    server: './'
  });
  gulp.watch('src/js/**/*.js',['js','reload']);
});
