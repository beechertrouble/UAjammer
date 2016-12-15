/**
 * GRUNT builds for tipzy
 *
 * Run `grunt watch` to develop, and this will automatically trigger
 * js/less dev buids as appropriate.
 *
 * Run `grunt production` to build for production, and this will trigger
 * js/less productuon builds, which are minified and ready for prime time.
 *
 */
module.exports = function(grunt) {

	// @note run `grunt watch` to have ongoing dev builds as files are modified
	grunt.registerTask('watch', ['watch']);


	/**
	 * This task builds our JS and LESS in a production configuration
	 */
	grunt.registerTask('production', [
		'concat', // concatinate require.js and our application js into one file
		'uglify', // uglify/min our JS
	]);

	/**
	 * The default build is a production build -- JS/LESS are minified and uglified
	 */
	grunt.registerTask('default', ['production']);

	// some handy vars maybe
	var cnf = {
		pkg: grunt.file.readJSON('package.json'),
		banner: "/**" +
					'\n* <%= cnf.pkg.name %>' +
					'\n* v<%= cnf.pkg.version %>' +
					'\n* <%= grunt.template.today("yyyy-mm-dd hh:MM:ss TT") %> ' +
					"\n*/ \n\n",
		bannerAMD: "/**" +
					'\n* <%= cnf.pkg.name %> - amd' +
					'\n* v<%= cnf.pkg.version %>' +
					'\n* <%= grunt.template.today("yyyy-mm-dd hh:MM:ss TT") %> ' +
					"\n*/ \n\n"
	};

	grunt.initConfig({

		cnf: cnf,

		concat: {
			jsMain: {
				options: {
					separator: '\n',
					banner: "<%= cnf.banner %>"
				},
				src: [
					"js-src/UAjammer.js",
				],
				dest: "UAjammer/UAjammer.js"
			},
			
//			jsAMD: {
//				options: {
//					separator: '\n',
//					banner: "<%= cnf.banner %>"
//				},
//				src: [
//					"js-src/header.amd.js",
//					"js-src/UAjammer.js",
//					"js-src/footer.amd.js",
//				],
//				dest: "UAjammer/UAjammer.amd.js"
//			},

		},

		/**
		 * Minify our JS for production builds
		 */
		uglify: {
			options: {
				mangle: true,
				banner: "<%= cnf.banner %>"
			},
			js: {
				files: {
					'UAjammer/UAjammer.min.js' : ['UAjammer/UAjammer.js']
				}
			},
		},

		jshint: {
			options: {
				curly: false,
				eqeqeq: false,
				eqnull: false,
				browser: true,
				force: true,
				globals: {
					jQuery: true
				},
				ignores: [
					"js-src/header.amd.js",
					"js-src/footer.amd.js"
				]
			},
			dev: ['js-src/**/*.js']
		},

		watch: {
			js: {
				files: [
					'js-src/**/*.js'
				],
				// watch assumes 'dev' is happening
				tasks: ['jshint:dev', 'concat']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

};
