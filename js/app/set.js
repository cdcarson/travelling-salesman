define(function(require) {

	var _ = require('underscore');
	require('paper-full.min');

	var utils = require('app/utils');


	function Set(n, max_x, max_y){
		var i;
		this.points = [];
		for(i = 0; i < n; i++){
			this.points.push(utils.random_point(utils.alpha_key(i), max_x, max_y))
		}
		this.layer = new paper.Layer();
	}
	Set.prototype.render = function(){
		var that = this;
		this.layer.removeChildren();
		var color = new paper.Color(1, 0, 0);
		_.each(this.points, function(point){
			var circle = new paper.Path.Circle({
				center: point,
				radius: 2
			});
			var text = new paper.PointText({
				point: point.add({x: 2, y: 10}),
				content: point.key,
				fillColor: 'black',
				fontSize: 12
			});
			circle.fillColor = color;
			that.layer.addChild(circle);
			that.layer.addChild(text);
		});
	};

	return Set;
});

