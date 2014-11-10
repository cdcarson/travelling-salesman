define(function(require) {

	var $ = require('jquery');
	var _ = require('underscore');
	var utils = require('app/utils');
	var Set = require('app/set');
	var Spiral = require('app/spiral');
	require('paper-full.min');

	function App() {
		paper.setup(document.getElementById('canvas'));
		var set = new Set(20, $(window).width(), $(window).height());
		var spiral = new Spiral(set.points);
		set.render();
		spiral.render();
		paper.view.draw();
	}

	return App;
});
