var Backbone = require('backbone');
Backbone.$   = require('jquery');

import {Pings} from './collections/pings';
import {Ripples} from './views/ripples';

var view = new Ripples({
	el: canvas,
	collection: new Pings()
});

requestAnimationFrame(function loop() {
	view.render();
	requestAnimationFrame(loop);
});

setInterval(function() {
	view.$el.trigger({
		type: 'click',
		pageX: canvas.width * Math.random(),
		pageY: canvas.width * Math.random()
	})
}, 1000 / 60)
