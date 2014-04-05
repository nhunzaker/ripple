import {View} from 'backbone';

var $ = require('jquery');

export class Sonic extends View {

	events() {
		return {
			click: 'handleClick'
		}
	}

	initialize() {
		this.resize();
		this.ctx = this.el.getContext('2d');
		$(window).on('resize.ping-' + this.cid, this.resize.bind(this));
	}


	handleClick(e) {
		this.collection.add({
			x: e.pageX,
			y: e.pageY
		});
	}

	remove() {
		$(window).off('resize.ping-' + this.cid);
		Backbone.View.prototype.remove.call(this, arguments);
	}

	resize() {
		this.el.width  = window.innerWidth;
		this.el.height = window.innerHeight;
	}

	render() {
		var ctx = this.ctx;

		ctx.globalCompositeOperation = "darken";
		ctx.fillStyle = "rgba(40, 10, 0, 0.1)";
		ctx.fillRect(0, 0, this.el.width, this.el.height);

		ctx.globalCompositeOperation = 'lighten';
		ctx.lineWidth = 2;

		this.collection.each( model => {
			var progress = model.getProgress();

			ctx.strokeStyle = model.get('color');
			ctx.globalAlpha = Math.max(0, 1 - progress);

			ctx.beginPath();
			ctx.arc(model.get('x'), model.get('y'), 50 * progress, 0, Math.PI * 2);
			ctx.closePath();

			ctx.stroke();
		});
	}
}
