document.addEventListener('DOMContentLoaded', function() {
  // Получаем информацию о пользователе из локального хранилища
  const userId = localStorage.getItem('userId');

  // Если нет ID пользователя, перенаправляем на главную страницу
  if (!userId) {
    window.location.href = 'index.html';
    return;
  }

  // Загружаем информацию о пользователе с помощью fetch
  fetch(`http://localhost:8080/api/users/${userId}`)
    .then(response => response.json())
    .then(responseData => {
        // Проверяем, что тип запроса успешный
        if (responseData.type === "success") {
            const user = responseData.data; // Получаем данные пользователя из responseData.data

            // Заполняем данные пользователя на странице
            document.querySelector('.details img').src = `person1.jpg`; 
            document.querySelector('.details h3').textContent = `${user.firstname} ${user.surname}`;
            document.getElementById('age').textContent = user.age;
            // document.getElementById('gender').textContent = user.gender; 
            document.getElementById('region').textContent = user.region;
            document.getElementById('schedule').textContent = user.schedule;
            document.getElementById('salary').textContent = user.desired_salary;
            document.getElementById('about').textContent = user.about_yourself;
        } else {
            // Если тип запроса не "success", выведите сообщение об ошибке
            console.error('Ошибка при получении данных:', responseData.message);
        }
    })
    .catch(error => console.error('Ошибка при получении данных:', error));


  // Добавляем обработчик события отправки комментария
  const commentForm = document.getElementById('commentForm');
  commentForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Получаем текст комментария из поля ввода
    const commentText = document.getElementById('commentText').value;

    // Отправляем комментарий на сервер (здесь можно добавить запрос fetch)
    // В данном примере просто добавляем комментарий в список без отправки на сервер
    const commentList = document.getElementById('commentList');
    const newComment = document.createElement('div');
    newComment.textContent = commentText;
    commentList.appendChild(newComment);

    // Очищаем поле ввода после отправки
    document.getElementById('commentText').value = '';
  });
});
