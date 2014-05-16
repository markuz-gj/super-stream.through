
/**
 * @author Markuz GJ
 * @license MIT
 * @description - gulpfile for through
 */

var gulp = require('gulp')
, gutil = require('gulp-util')
, etc = require('etc-etc')

, SRC = './index.js'
, SPEC = './spec/index.coffee' 
, FIXTURE = './spec/fixture.coffee'
;

gulp.task("test:mocha", etc.mocha(SPEC))
gulp.task("test:istanbul", etc.istanbul(SPEC))
gulp.task('compile:docs', etc.jsdoc(SRC))

gulp.task('test', ['test:istanbul'])

gulp.task('watch:etc', function(){
  gulp.watch([__filename, '../etc-etc/*.{js,coffee}'], etc.exit)
})

if (process.argv.slice(-1)[0] === 'watch') {
  gulp.task("server", ["test:istanbul", "compile:docs"], etc.server())
}

gulp.task("watch", ["server", "watch:etc"], function() {

  return gulp.watch([SRC, SPEC, FIXTURE], function(evt) {
    if (evt.type !== 'added') {
      gulp.start('test:istanbul', 'compile:docs')
    }
  })
})


gulp.task("default", ["test"])
