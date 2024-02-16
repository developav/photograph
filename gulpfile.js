const {src, dest, series, watch} = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixes = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const browserSync = require('browser-sync').create()

const clean = () => {
   return del(['dist']) 
}
const resourses = () => {
    return src('src/resourses/**')
    .pipe(dest('dist'))
}
const stylesProd = () => {
    return src('src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(autoprefixes({
        cascade: false
    }))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const stylesDev = () => {
    return src('src/css/**/*.css')
    .pipe(concat('main.css'))
    .pipe(autoprefixes({
        cascade: false
    }))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const htmlMinifyProd = () => {
    return src('src/**/*.html')
    .pipe(htmlMin({
        collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const htmlMinifyDev = () => {
    return src('src/**/*.html')
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
    return src('src/img/svg/**/*.svg')
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: '../sprite.svg'
            }
        }
    }))
    .pipe(dest('dist/images'))
}
const scriptsProd = () => {
   return src([
    'src/js/components/**/*.js',
    'src/js/main.js',
    'src/js/yandexMap.js'
   ])
   .pipe(sourcemaps.init())
   .pipe(babel({
    presets:['@babel/env']
   }))
   .pipe(concat('app.js'))
   .pipe(uglify().on('error', notify.onError()))
   .pipe(sourcemaps.write())
   .pipe(dest('dist'))
   .pipe(browserSync.stream())
}

const scriptsDev = () => {
    return src([
        'src/js/components/**/*.js',
        'src/js/main.js'
       ])
       .pipe(concat('app.js'))
       .pipe(dest('dist'))
       .pipe(browserSync.stream())
}
const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}

const images = () => {
    return src([
        'src/img/**/*.jpg',
        'src/img/**/*.png',
        'src/img/*.svg',
        'src/img/**/*.jpeg',
    ])
    .pipe(image())
    .pipe(dest('dist/images'))
}
const imageMedia = () => {
    return src([
        'src/media/**/*.jpg',
        'src/media/**/*.png',
        'src/media/**/*.jpeg',
    ])
    .pipe(image())
    .pipe(dest('dist/media-image'))
}
watch('src/**/*.html', htmlMinifyProd)
watch('src/css/**/*.css', stylesProd)
watch('src/css/**/*.css', stylesDev)
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scriptsProd)
watch('src/js/**/*.js', scriptsDev)
watch('src/resourses/**', resourses)

exports.clean = clean
exports.dev = series(htmlMinifyDev,stylesDev,scriptsDev,images,svgSprites,watchFiles,imageMedia)
exports.default = series(clean,resourses,htmlMinifyProd, scriptsProd, stylesProd, images,imageMedia, svgSprites, watchFiles)