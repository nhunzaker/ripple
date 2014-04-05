var {Model} = require('backbone');

export class Ping extends Model {
	defaults() {
		return {
			color      : 'hsl(' + (Math.random() * 180) + ', 100%, 40%)',
			expiration : 1000,
			birth      : Date.now()
		}
	}

	shouldDie() {
		return this.getAge() > this.get('expiration');
	}

	getProgress() {
		return this.getAge() / this.get('expiration');
	}

	getAge () {
		return Date.now() - this.get('birth')
	}
}
