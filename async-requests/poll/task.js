async function loadPoll() {
	try {
		const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll');
		const data = await response.json();

		const pollTitle = data.data.title;
		const answers = data.data.answers;
		const pollId = data.id;

		document.getElementById('poll__title').textContent = pollTitle;

		const pollAnswersContainer = document.getElementById('poll__answers');
		pollAnswersContainer.innerHTML = '';

		answers.forEach((answer, index) => {
			const button = document.createElement('button');
			button.className = 'poll__answer';
			button.textContent = answer;
			button.addEventListener('click', () => vote(pollId, index));
			pollAnswersContainer.appendChild(button);
		});
	} catch (error) {
		console.error('Ошибка при загрузке опроса:', error);
	}
}

async function vote(pollId, answerIndex) {
	try {
		const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `vote=${pollId}&answer=${answerIndex}`
		});

		const resultData = await response.json();
		showVoteResult(resultData.stat);
		alert('Спасибо, ваш голос засчитан!')
	} catch (error) {
		console.error('Ошибка при голосовании:', error);
	}
}

function showVoteResult(stats) {
	const resultContainer = document.getElementById('result');
	resultContainer.innerHTML = '';

	stats.forEach((stat) => {
		const resultText = `${stat.answer}: ${stat.votes} голосов`;
		const resultItem = document.createElement('div');
		resultItem.textContent = resultText;
		resultContainer.appendChild(resultItem);
	});
}

loadPoll();
