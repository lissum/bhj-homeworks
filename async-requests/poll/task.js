document.addEventListener('DOMContentLoaded', function() {
	async function fetchPollData() {
		try {
			const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll');
			const data = await response.json();

			const pollTitle = document.getElementById('poll__title');
			pollTitle.textContent = data.data.title;

			const pollAnswersContainer = document.getElementById('poll__answers');
			pollAnswersContainer.innerHTML = '';

			data.data.answers.forEach(answer => {
				const button = document.createElement('button');
				button.className = 'poll__answer';
				button.textContent = answer;

				button.addEventListener('click', function() {
					alert('Спасибо, ваш голос засчитан!');
				});

				pollAnswersContainer.appendChild(button);
			});
		} catch (error) {
			console.error('Ошибка при загрузке данных опроса:', error);
		}
	}

	fetchPollData();
});
