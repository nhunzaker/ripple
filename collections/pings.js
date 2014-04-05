import {Collection} from 'backbone';
import {Ping} from "../models/ping";

export class Pings extends Collection {

	constructor(options) {
		super (options);
		this.model = Ping;
	}

	initialize() {
		this.on('add', this.cull);
	}

	cull () {
		this.remove(this.filter(m => m.shouldDie()));
	}
}
