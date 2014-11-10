define(function(require){
	require('paper-full.min');

	var _ = require('underscore');
	var utils = require('app/utils');

	function Spiral(S){
		var min, tops, next;
		this.unvisited = _.clone(S);

		min = _.min(_.pluck(this.unvisited, 'y'));

		//find the topmost point(s), where y = min
		tops = _.where(this.unvisited, {y: min});

		//put the top or tops into our path, sorted by x, lowest to highest
		this.visited = _.sortBy(tops, 'x');

		//...and remove them from the array of unvisited points
		this.unvisited = _.difference(this.unvisited, this.visited);



		this.angle = 0;

		// So far we have a set of visited points
		// a set of unvisited points, and an angle
		// representing the directionality of the spiral.
		// From what we've  done above, our spiral starts
		// at the leftmost of the topmost points,
		// and will proceed clockwise from there.


		//Iterate...
		while(0 !== this.unvisited.length){

			next = this.find();
			console.log(next);
			this.visited.push(next);
			this.unvisited = _.without(this.unvisited, next);
		}

	}

	Spiral.prototype.find = function(){
		var min = Infinity;
		var end = _.last(this.visited);
		var next = [];
		var interesting_angle = this.angle - 180;


		//say our current angle is 45
		//we are int

		// Test all unvisited points...
		_.each(this.unvisited, function(point){
			var vector = new paper.Point(point.x - end.x, point.y - end.y);
			var diff = (vector.angle - interesting_angle);
			if (diff === min){
				next.push(point);
			} else {
				if (diff < min){
					next = [point];
					min = diff;
				}
			}
		});

		// We have to handle the case where next contains more than one point.
		// In that case next should be ordered by distance to the endpoint
		next = _.sortBy(next, function(point){
			return utils.distance(end, point);
		});
		return _.first(next);
	};

	Spiral.prototype.render = function(){
		var path = new paper.Path(this.visited);
		path.strokeColor = 'black';
	};

	return Spiral;



});

