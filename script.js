// script.js
document.addEventListener("DOMContentLoaded", function () {
    const birthdayMessage = document.getElementById('birthdayMessage');

    loadJson('birthdays.json')
        .then(data => checkBirthday(data))
        .catch(error => console.error('Error loading or parsing JSON:', error));

    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}/${month}`;
    }

    function formatDateFromString(dateString) {
        const [day, month] = dateString.split('/');
        return `${day}/${month}`;
    }

    function checkBirthday(data) {
        const today = new Date();
        const todayFormatted = formatDate(today);

        const matchingBirthdays = data.filter(person => person.birthday === todayFormatted);

        if (matchingBirthdays.length > 0) {
            const birthdayMessages = matchingBirthdays.map(person => {
                const { name, class: studentClass, section, birthday } = person;
                return `
                    Happy Birthday ${name} (${studentClass}-${section})! 🎉<br>
                    Birthday: ${formatDateFromString(birthday)}
                `;
            });

            birthdayMessage.innerHTML = birthdayMessages.join('<br><br>');
        } else {
            birthdayMessage.innerHTML = "No birthdays today. Check back tomorrow!";
        }
    }
});
