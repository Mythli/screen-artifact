module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
				files: {
					'build/css.css' : 'design/style/design.scss'
				}
			}
		},

		emberTemplates: {
			compile: {
				options: {
					templateFileExtensions: /\.hbs/,
					templateBasePath: /design\/template\//
				},
				files: {
					'build/template.js': 'design/template/**/*.hbs'
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'build/style.css': [
						'build/css.css'
					]
				}
			}
		},
		uglify: {
			build: {
				files: {
					'build/Script.js': [
						'script/application.js',
						'script/router.js'
					],
					'build/compatibility.js': [
						'script/library/html5shiv.js',
						'script/library/Respond.js'
					]
				}
			}
		},

		compress: {
			main: {
				options: {
					mode: 'gzip',
					level: 6
				},
				
				files: [
					{ expand: true, src: ['build/**/*.js'], dest: '', ext: '.js.gz' },
					{ expand: true, src: ['build/**/*.css'], dest: '', ext: '.css.gz' }
				]
			}
		},

		clean: [
			'build/**/*'
		],

		watch: {
			compileHandlebars: {
				files: [
					'design/template/**/*.hbs'
				],
				tasks: [
					'emberTemplates'
				]
			},
			compileSaas: {
				files: [
					'design/style/**/*.scss'
				],
				tasks: [
					'sass'
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-ember-templates');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [
		'clean',
		'sass',
		'emberTemplates',
		'cssmin',
		'uglify',
		'compress'
	]);

	grunt.registerTask('debug', [
		'emberTemplates',
		'sass',
		'watch'
	]);
};