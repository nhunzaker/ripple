var Backbone = require('backbone');
Backbone.$   = require('jquery');

import {Pings} from './collections/pings';
import {Sonic} from './views/sonic';

var view = new Sonic({
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
