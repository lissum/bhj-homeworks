const deadCounter = document.getElementById('dead');
const lostCounter = document.getElementById('lost');

const getHole = index => document.getElementById(`hole${index}`);

function checkGameEnd() {
	const dead = parseInt(deadCounter.textContent);
	const lost = parseInt(lostCounter.textContent);

	if (dead >= 10) {
		alert('Победа!');
		resetGame();
		return true;
	}

	if (lost >= 5) {
		alert('Вы проиграли!');
		resetGame();
		return true;
	}

	return false;
}

function resetGame() {
	deadCounter.textContent = '0';
	lostCounter.textContent = '0';
}

function handleClick(event) {
	const hole = event.target;

	if (hole.classList.contains('hole_has-mole')) {
		const currentScore = parseInt(deadCounter.textContent);
		deadCounter.textContent = currentScore + 1;
	} else {
		const currentMisses = parseInt(lostCounter.textContent);
		lostCounter.textContent = currentMisses + 1;
	}

	checkGameEnd();
}

for (let i = 1; i <= 9; i++) {
	const hole = getHole(i);
	hole.addEventListener('click', handleClick);
}
