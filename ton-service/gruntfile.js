var grunt = require('grunt');
var glob = require('glob');
grunt.loadNpmTasks('grunt-purifycss');
var cssSource = glob.sync('./dist/ton-service/*.css').toString();
grunt.initConfig({
  purifycss: {
    options: {
      info: true,
      minify: true,
      rejected: true, // Logs the CSS rules that were removed
      whitelist: ['*transition*', '*dimmer*', '*ql-*']
    },
    target: {
      cwd: '.',
      src: ['./src/app/**/*.ts', './src/app/**/*.html'],
      css: [cssSource],
      dest: cssSource
    },
  },
});
