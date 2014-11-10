define(function(require){
	var _ = require('underscore');

	require('paper-full.min');

	function Solution (points, visited){
		//points is the global set of points. Each point in points has a unique key
		this.points = points;

		//visited is an array of keys representing the points visited thus far
		this.visited = visited;

		//We create a tree structure for possible solutions...
		this.children = [];

		//call a strategy for picking child solutions
		this.strategy();

	}

	Solution.prototype.strategy = function(){
		var that = this;
		//this is the base class, so we use brute force...
		_.each(this.unvisited(), function(key){
			var visited = _.clone(that.visited);
			visited.push(key);
			that.children.push(
				new Solution(
					that.points,
					visited
				)
			);
		});
	};

	Solution.prototype.unvisited = function(){
		return _.difference(_.pluck(this.points, 'key'), this.visited);
	};

	Solution.prototype.complete = function(){
		return this.unvisited().length === 0;
	};

	Solution.prototype.distance = function(){
		var d = 0, i, line;
		for (i = 0; i < this.visited.length - 1; i++){
			line = new paper.Path.Line(_.find(this.points,{key: this.visited[i]}), _.find(this.points,{key: this.visited[i+1]}));
			d += line.length;
		}
		return d;
	};

	Solution.prototype.log = function(){
		var that = this;
		if (! this.complete()){
			_.each(this.children, function(child){
				child.log();
			})
		} else {
			console.log(this.visited.join(), this.distance())
		}
	};

	return Solution;


});
