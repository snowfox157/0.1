var gulp = require('gulp');//能夠套用gulp這個套件

gulp.task('hello',function(){
    //開始做事情拉捧友
    console.log('hello word');

});
//搬運、移動檔案(html)
gulp.task('move',function(){
    return gulp.src('index.html')//來源
    .pipe(gulp.dest('dest/'))//目的地
})

//搬運檔案(css)
gulp.task('movecss',function(){
    return gulp.src('css/*.css')//來源
    .pipe(gulp.dest('dest/css'))//目的地
})
//產生css壓縮檔
var cleanCSS = require('gulp-clean-css');
gulp.task('minicss', () => {
  return gulp.src('styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dest'));
});

//css合併
var concat = require('gulp-concat');
    //流程:
  //1.sass
  //2.壓縮:css
  //3.合併:css
gulp.task('contact',['sass'], function() {//['sass']會先去完成sass這個函數再去執行contact，
                                        //如果相反(['contact']放入sass函數中)流程可完成但是是錯誤的
  return gulp.src('css/*.css')
    // .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('all.css'))//壓縮與合併位置順序不同時，會產生不一樣的結果
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dest'));
});

//sass轉譯

var sass = require('gulp-sass');
sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('./sass/*.scss')//來源
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css'));//目的地
  });

  //sass隨時監控

  gulp.task('watch' ,function(){
      gulp.watch('./sass/*.scss' ,['sass']);//sass發生改變即發生此函數(sass監控)
      gulp.watch('./*.html' ,['move'])
  })

  //瀏覽器監控，可直接使用瀏覽器(手機等)觀看結果

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('sync', function() {
   browserSync.init({
       server: {
           baseDir: "./dest",
           index : "index.html"
       }
   });
    gulp.watch('./*.html' ,['move']).on('change',reload);
});
//沒聽很懂得地方 認真研究!!!!!合併功能
var fileinclude = require('gulp-file-include');

gulp.task('fileinclude', function () {
 gulp.src(['*.html'])
   .pipe(fileinclude({
     prefix: '@@',
     basepath: '@file'
   }))
   .pipe(gulp.dest('./dest'));
});
//老師有上傳完整合併版本可以多學習學習




// html 樣板
var fileinclude = require('gulp-file-include');
gulp.task('fileinclude', function () {
  gulp.src(['*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dest'));
});


// 壓圖
var imagemin = require('gulp-imagemin');

gulp.task('miniimg',function(){
gulp.src('./dev/images/*')
.pipe(imagemin())
.pipe(gulp.dest('dest/images'))
})  
