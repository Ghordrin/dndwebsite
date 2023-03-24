const form = document.getElementById('uploadForm');
const fileList = document.getElementById('fileList');

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const fileInput = document.getElementById('file');
	const file = fileInput.files[0];
	const formData = new FormData();
	formData.append('file', file);

	fetch('https://api.github.com/repos/ghordrin/dndwebsite/contents/uploads/' + file.name, {
		method: 'PUT',
		headers: {
			'Authorization': 'token ACCESS_TOKEN',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			message: 'Upload file',
			content: btoa(file),
			sha: ''
		})
	})
	.then(response => response.json())
	.then(data => {
		const fileName = data.content.name;
		const fileURL = data.content.html_url;
		const listItem = document.createElement('li');
		const link = document.createElement('a');
		link.href = fileURL;
		link.textContent = fileName;
		listItem.appendChild(link);
		fileList.appendChild(listItem);
	})
	.catch(error => console.error(error));
});
