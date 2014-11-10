requirejs.config({
	baseUrl: 'js/lib',
	paths: {
		app: '../app'
	},
	shim: {
		'bootstrap': {
			deps: ['jquery']
		},
		'vendor/backbone': {
			deps: ['underscore', 'jquery']
		}
	}

});

requirejs(['app/app', 'bootstrap'], function(app){
	new app();
});



