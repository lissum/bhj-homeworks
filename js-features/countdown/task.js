class CountdownTimer {
	constructor(elementId) {
		this.timerElement = document.getElementById(elementId);
		this.initialTime = parseInt(this.timerElement.textContent);
		this.currentTime = this.initialTime;
		this.timerId = null;
	}

	formatTime(seconds) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;

		const displayHours = String(hours).padStart(2, '0');
		const displayMinutes = String(minutes).padStart(2, '0');
		const displaySeconds = String(remainingSeconds).padStart(2, '0');

		return `${displayHours}:${displayMinutes}:${displaySeconds}`;
	}

	updateDisplay(useAdvancedFormat = false) {
		if (useAdvancedFormat) {
			this.timerElement.textContent = this.formatTime(this.currentTime);
		} else {
			this.timerElement.textContent = this.currentTime;
		}
	}

	start(useAdvancedFormat = false) {
		this.timerId = setInterval(() => {
			this.currentTime--;
			this.updateDisplay(useAdvancedFormat);

			if (this.currentTime <= 0) {
				this.stop();
				alert('Вы победили в конкурсе!');
			}
		}, 1000);
	}

	stop() {
		if (this.timerId) {
			clearInterval(this.timerId);
			this.timerId = null;
		}
	}

	reset() {
		this.stop();
		this.currentTime = this.initialTime;
		this.updateDisplay();
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const timer = new CountdownTimer('timer');

	timer.start();
});
