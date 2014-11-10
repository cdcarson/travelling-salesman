define(function(require){

	require('paper-full.min');

	return {
		/**
		 * Returns a Paper point with a key
		 * @param key
		 * @param x
		 * @param y
		 * @returns {paper.Point}
		 */
		point: function(key, x, y){
			var p = new paper.Point(x, y);
			p.key = key;
			return p;
		},

		random_point: function(key, max_x, max_y){
			var x = this.random_float(0, max_x);
			var y = this.random_float(0, max_y);
			return this.point(key, x, y);
		},

		random_float: function(min, max) {
			return Math.random() * (max - min) + min;
		},

		alpha_key: function(i){
			var ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			var sup = ch[(i % ch.length)];
			var sub = Math.floor(i/ch.length);
			if (0 === sub) return sup;
			return sup + sub;
		},
		distance: function(p, q){
			return Math.sqrt(Math.pow(q.x - p.x, 2) + Math.pow(q.y - p.y, 2))
		}
	};
});
