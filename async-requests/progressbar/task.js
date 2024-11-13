document.getElementById('uploadForm').addEventListener('submit', function(event) {
	event.preventDefault();

	let formData = new FormData();
	let fileInput = document.getElementById('fileInput');
	formData.append('file', fileInput.files[0]);

	let xhr = new XMLHttpRequest();

	xhr.upload.addEventListener('progress', function(event) {
		if (event.lengthComputable) {
			let percent = (event.loaded / event.total) * 100;
			let progressBar = document.getElementById('progress');
			progressBar.value = percent;
		}
	});

	xhr.onload = function() {
		if (xhr.status === 200) {
			alert('Загрузка завершена!');
		} else {
			alert('Ошибка загрузки!');
		}
	};

	xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload', true);
	xhr.send(formData);
});
