var gulp =require('gulp');
var browserify =require('browserify');
var source = require('vinyl-source-stream');
var concat =require('gulp-concat');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del =require('del');
var jshint =require('gulp-jshint');

var buildProduction = utilities.env.production;

var babelify = require("babelify");

var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});
var browserSync = require('browser-sync').create();


gulp.task('build',function(){
  if (buildProduction) {
    gulp.start('minify');
  } else {
    gulp.start ('browserify');
  }
})

gulp.task('concat', function() {
  return gulp.src(['./js/tamagotchi-interface.js'])
  .pipe(concat('concatenated.js'))
  .pipe(gulp.dest("./tmp"));
});

gulp.task('browserify',['concat'], function() {
  return browserify({ entries: ['./tmp/concatenated.js']})
    .transform(babelify.configure({
      presets: ["es2015"]
    }))
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'))
});

gulp.task("minify",["browserify"],function(){
  return gulp.src(".build/js/app.js")
  .pipe(uglify())
  .pipe(gulp.dest("./build/js"));
});

gulp.task("clean", function() {
  return del(['build','tmp']);
});

gulp.task('jshint',function(){
  return gulp.src(['js/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});
gulp.task('bowerJS', function() {
  return gulp.src(lib.ext('js').files)
  .pipe(concat('vendor.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./build/js'));
});
gulp.task('bowerCSS', function() {
  return gulp.src(lib.ext('css').files)
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest('./build/css'));
});

gulp.task('bower', ['bowerJS', 'bowerCSS']);

gulp.task('build', ['clean'], function(){
  if (buildProduction) {
    gulp.start('minify');
  } else {
    gulp.start('browserify');
  }
  gulp.start('bower');
});


//server

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
  // gulp.watch(['gulpfile.js'], ['build']);
});

gulp.task('jsBuild', ['browserify', 'jshint'], function(){
  browserSync.reload();
});

gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});
