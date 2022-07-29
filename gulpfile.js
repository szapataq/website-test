const gulp = require("gulp")
const pug = require('gulp-pug')
const gulpSass = require('gulp-sass')
const nodeSass =require('node-sass')
const plumber = require("gulp-plumber")
const sass = gulpSass(nodeSass);
const browserSync = require('browser-sync')

const server = browserSync.create()

gulp.task('sass', () => {
  return gulp.src('./dev/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'))
    .pipe(browserSync.stream())
})

gulp.task('pug', () => {
  return gulp.src('./dev/pages/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./public/'))
})

gulp.task('default', () => {
  server.init({
    server: './public'
  })

  //pug
  gulp.watch('./dev/**/*.pug', gulp.series('pug')).on('change', server.reload)
  //sasss
  gulp.watch('./dev/scss/**/*.scss', gulp.series('sass')).on('change', server.reload)
  
})