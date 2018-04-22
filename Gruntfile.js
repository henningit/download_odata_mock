module.exports = function (grunt) {

	var baseUrl = 'server:port:5401/odata/service_provider';

	grunt.initConfig({

		debug: {
			options: {
				open: true // do not open node-inspector in Chrome automatically
			}
		},

		prompt: {
			configCurl: {
				options: {
					questions: [
						{
							config: 'configCurl.options.user', // arbitrary name or config for any other grunt task
							input: 'password', // list, checkbox, confirm, input, password
							message: 'Enter User', // Question to ask the user, function needs to return a string,
							default: 'user' // default value if nothing is entered
						},
						{
							config: 'configCurl.options.password',
							type: 'password',
							message: 'Enter Password',
							default: 'password'
						}
					]
				}
			}
		},

		curl: {},

		json_massager: {
			target1: {
				files: { "M2SOview.json" : "M2SOview.json" },
				modifier: function(obj) {
					return obj.d.results;
				}
			},
			target2: {
				files: { "PDocItem.json" : "PDocItem.json" },
				modifier: function(obj) {
					return obj.d.results;
				}
			},
			target3: {
				files: { "PGrItem.json" : "PGrItem.json" },
				modifier: function(obj) {
					return obj.d.results;
				}
			},
			target4: {
				files: { "PReqItem.json" : "PReqItem.json" },
				modifier: function(obj) {
					return obj.d.results;
				}
			},
			target5: {
				files: { "SupInvItem.json" : "SupInvItem.json" },
				modifier: function(obj) {
					return obj.d.results;
				}
			}
		}

	});

	// Load in `grunt-curl`
	grunt.loadNpmTasks('grunt-curl');
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //: --no-check-certificate
	grunt.loadNpmTasks('grunt-debug-task');
	grunt.loadNpmTasks('grunt-prompt');
	grunt.loadNpmTasks('grunt-json-massager');

// Tasks:
	grunt.registerTask('configCurl', 'Configure curl for download', function() {
		var user = this.options().user;
		var password = this.options().password;
		var sUrlPrefix = 'https://' + user + ':' + password + '@' + baseUrl + '/';
		var sJson = '?\$format=json';
		grunt.config.merge({
			curl: {
				'metadata.xml':    sUrlPrefix + '\$metadata',
				'M2SOview.json':   sUrlPrefix + 'M2SOview'   + sJson + '&\$top=20',
				'PDocItem.json':   sUrlPrefix + 'PDocItem'   + sJson + '&\$top=100',
				'PGrItem.json':    sUrlPrefix + 'PGrItem'    + sJson + '&\$top=100',
				'PReqItem.json':   sUrlPrefix + 'PReqItem'   + sJson + '&\$top=100',
				'SupInvItem.json': sUrlPrefix + 'SupInvItem' + sJson + '&\$top=100'
			}
		});
	});

	grunt.registerTask('welcome', 'log some info', function() {
		grunt.log.write('Download mock data from odata service' + baseUrl);
	});

	grunt.registerTask(
		'default', ['welcome', 'prompt', 'configCurl', 'curl', 'json_massager']
	);
};
