function toggleLastName(element) {
    const lastName = element.nextElementSibling;
    const headerTitle = document.querySelector('.header h1');

    // Закрыть текущий открытый заголовок
    const isOpened = !lastName.classList.contains('hidden');
    lastName.classList.toggle('hidden', isOpened);

    const openedTitle = isOpened ? 'Мавлид лезги чIалал' : element.textContent.trim();
    headerTitle.textContent = openedTitle;
}

fetch('../../assets/db.json')
    .then(response => response.json())
    .then(data => {
        const poetryElement = document.getElementById('poetry');
        data.forEach(poem => {
            const idWithLeadingZero = poem.id.toString().padStart(2, '0');
            poetryElement.innerHTML += `<div class="box">
                <p class="first_name" onclick="toggleLastName(this)"> <span> ${idWithLeadingZero} </span> ${poem.first_name}</p>
                <p class="last_name hidden">${poem.last_name}</p>
            </div>`;
        });
    });