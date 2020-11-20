const gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  gcmq = require('gulp-group-css-media-queries'),
  csso = require('gulp-csso'),
  prefix = require('gulp-autoprefixer'),
  imgMin = require('gulp-imagemin'),
  pngQuant = require('imagemin-pngquant'),
  uglES = require('gulp-uglify-es').default(),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  sync = require('browser-sync'),
  babel = require('gulp-babel'),
  root = {
    'dev': './app',
    'prod': './docs'
  },
  dev = {
    'html': root.dev + '/index.html',
    'js': root.dev + '/assets/js/**/*.js',
    'fonts': root.dev + '/assets/fonts/**/*.ttf',
    'scss': root.dev + '/assets/scss/styles.scss',
    'img': root.dev + '/assets/img/**/*.{jpg,png,jpeg,gif,svg,ico}',
  },
  prod = {
    'css': root.prod + '/css',
    'js': root.prod + '/js',
    'fonts': root.prod + '/fonts',
    'img': root.prod + '/img',
  };

sass.compiler = require('node-sass');

gulp.task('html', () => {
  return gulp.src(dev.html)
    .pipe(gulp.dest(root.prod))
});

gulp.task('sass', () => {
  return gulp.src(dev.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix([
      '> 1%',
      'ie 8',
      'ie 7',
      'last 15 versions'
    ]))
    .pipe(rename({
      basename: 'styles',
      suffix: '.min',
      extname: '.css',
    }))
    .pipe(gcmq())
    .pipe(csso())
    .pipe(gulp.dest(prod.css));
});

gulp.task('js', () => {
  return gulp.src(dev.js)
    .pipe(concat('app.min.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglES)
    .pipe(gulp.dest(prod.js));
});

gulp.task('img', () => {
  return gulp.src(dev.img)
    .pipe(imgMin({
      interlaced: true,
      progressive: true,
      svgoPlugins: {removeViewBox: false},
      use: pngQuant(),
    }))
    .pipe(gulp.dest(prod.img));
});

gulp.task('fonts', () => {
  gulp.src(dev.fonts)
    .pipe(ttf2woff())
    .pipe(gulp.dest(prod.fonts));

  return gulp.src(dev.fonts)
    .pipe(ttf2woff2())
    .pipe(gulp.dest(prod.fonts));
});

gulp.task('build', gulp.series([
  'img',
  'fonts',
  'sass',
  'js',
  'html',
]));

gulp.task('serve', () => {
  sync({
    server: {
      baseDir: root.prod,
    },
    notify: false,
  });

  sync.watch(root.dev);
});

gulp.task('watch', () => {
  gulp.watch(dev.js, gulp.series(['js']));
  gulp.watch(dev.html, gulp.series(['html']));
  gulp.watch(root.dev + '/assets/scss/**/*.scss', gulp.series(['sass']));
});

gulp.task('default', gulp.parallel([
  'serve',
  'watch',
]));