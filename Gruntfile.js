const path = require('path');

var router = function(path) {
  if (m = path.match(/src\/texture\/(.*)/)) {
    return m[1];
  } else if (m = path.match(/build\/(.*)/)) {
    return 'script/' + m[1];
  }
  return path;
};

module.exports = function(grunt) {
  const pkg = grunt.file.readJSON('package.json');
  const ftp = grunt.file.readJSON('.ftppass');

  grunt.initConfig({
    pkg: pkg,
    'ftp-deploy': {
      build: {
        auth: {
          host: ftp['key'].ip,
          port: ftp['key'].port,
          authKey: 'key'
        },
        src: 'temp',
        dest: '/_modpe_scripts'
      }
    },
    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify']
          ]
        },
        src: `src/${pkg.name}.js`,
        dest: `build/${pkg.name}.js`
      },
      test: {
        options: {
          transform: [
            ['babelify']
          ]
        },
        src: `src/${pkg.name}.js`,
        dest: `temp/${pkg.name}.js`
      }
    },
    uglify: {
      build: {
        src: `build/${pkg.name}.js`,
        dest: `build/${pkg.name}.min.js`
      },
      test: {
        src: `temp/${pkg.name}.js`,
        dest: `temp/${pkg.name}.min.js`
      }
    },
    zip: {
      'test': {
        router: router,
        src: ['temp/manifest.json', 'src/texture/*', 'temp/*.min.js'],
        dest: `temp/${pkg.name}.modpkg`
      },
      'build': {
        router: router,
        src: ['temp/manifest.json', 'src/texture/*', 'build/*.min.js'],
        dest: `build/${pkg.name}.modpkg`
      }
    },
    "file-creator": {
      basic: {
        "temp/manifest.json": function(fs, fd, done) {
          fs.writeSync(fd, JSON.stringify({
            name: pkg.name,
            author: pkg.author,
            description: pkg.description,
            version: pkg.version
          }));
          done();
        }
      }
    },
    clean: ['temp/']
  });

  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-file-creator');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('test', ['browserify:test', 'uglify:test', 'file-creator', 'zip:test', 'ftp-deploy', 'clean']);
  grunt.registerTask('default', ['browserify', 'uglify', 'file-creator', 'zip:build']);

};
