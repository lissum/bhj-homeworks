class CookieClicker {
	constructor() {
		this.counter = document.getElementById('clicker__counter');
		this.cookie = document.getElementById('cookie');
		this.clicks = 0;
		this.isEnlarged = false;
		this.lastClickTime = null;
		this.clickTimes = [];

		this.speedCounter = document.createElement('div');
		this.speedCounter.className = 'clicker__status';
		this.speedCounter.innerHTML = 'Скорость клика: <span id="click__speed">0</span> кликов/сек';
		document.querySelector('.clicker').appendChild(this.speedCounter);

		this.initialize();
	}

	initialize() {
		this.cookie.addEventListener('click', () => this.handleClick());
	}

	handleClick() {
		this.clicks++;
		this.counter.textContent = this.clicks;

		if (this.isEnlarged) {
			this.cookie.width = 200;
		} else {
			this.cookie.width = 250;
		}
		this.isEnlarged = !this.isEnlarged;

		const currentTime = Date.now();
		if (this.lastClickTime) {
			this.clickTimes.push(currentTime - this.lastClickTime);

			if (this.clickTimes.length > 10) {
				this.clickTimes.shift();
			}

			const averageTime = this.clickTimes.reduce((a, b) => a + b, 0) / this.clickTimes.length;
			const clicksPerSecond = (1000 / averageTime).toFixed(2);

			document.getElementById('click__speed').textContent = clicksPerSecond;
		}
		this.lastClickTime = currentTime;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new CookieClicker();
});
