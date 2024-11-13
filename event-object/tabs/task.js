document.addEventListener('DOMContentLoaded', function() {
	const tabs = document.querySelectorAll('.tab');
	const contents = document.querySelectorAll('.tab__content');

	function switchTab(index) {
		tabs.forEach(tab => tab.classList.remove('tab_active'));
		contents.forEach(content => content.classList.remove('tab__content_active'));

		tabs[index].classList.add('tab_active');
		contents[index].classList.add('tab__content_active');
	}

	tabs.forEach((tab, index) => {
		tab.addEventListener('click', function() {
			switchTab(index);
		});
	});

	switchTab(0);
});
