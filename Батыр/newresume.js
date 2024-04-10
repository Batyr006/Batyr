document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.querySelector('input[placeholder="Введите вашу почту"]');
    const emailRegex = /^@|@gmail\.com$|@mail\.ru$/;

    emailInput.addEventListener('input', function() {
      const inputValue = emailInput.value;
      const isValid = inputValue.match(emailRegex);

      if (isValid) {
        emailInput.style.color = 'black'; // Черный цвет текста для правильного ввода
      } else {
        emailInput.style.color = 'red'; // Красный цвет текста для неправильного ввода
      }
    });
  });

// document.addEventListener("DOMContentLoaded", function() {
//     // Получаем форму по идентификатору
//     var form = document.getElementById("registrationForm");

//     // Добавляем обработчик события отправки формы
//     form.addEventListener("submit", function(event) {
//         // Предотвращаем отправку формы по умолчанию
//         sendData()
//     });
// });

function sendData(event) {
  event.preventDefault();
  // Get input values
   const firstname = document.querySelector('input[name="firstname"]').value;
   const surname = document.querySelector('input[name="surname"]').value;
   const age = document.getElementById('raion_old').value;
   const region = document.getElementById('raion').value;
   const email = document.querySelector('input[name="email"]').value;
   const phone_number = document.querySelector('input[name="phone_number"]').value;
   const schedule = document.getElementById('graph').value;
   const experience = document.querySelector('input[name="experience"]').value;
   const about_yourself = document.querySelector('input[name="about_yourself"]').value;
   const desired_salary = document.getElementById('raion_salary').value;

   // Get gender
  //  const gender = document.querySelector('input[name="gender"]:checked').value;

   // Create JSON object
   const data = {
       firstname: firstname,
       surname: surname,
       age: age,
       region: region,
       email: email,
       phone_number: phone_number,
       schedule: schedule,
       experience: experience,
       about_yourself: about_yourself,
       desired_salary: desired_salary,
      //  gender: gender
   };

  // Send data to API endpoint using fetch
  fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    // Optionally, perform actions after successful submission
    console.log('Success:', data);
      // Переходим на следующую страницу (замените "next_page.html" на ваш путь к следующей странице)
      // window.location.href = "indd.html";
      // Show SweetAlert2 modal with button
      Swal.fire({
        icon: 'success',
        title: 'Ваши данные успешно сохранены! Теперь требуется выполнить оплату. Желаете продолжить?',
        showCancelButton: true,
        confirmButtonText: 'Да, продолжить',
        cancelButtonText: 'Нет, спасибо', 
      }).then((result) => {
        if (result.isConfirmed) {
          // Retrieve the id from the JSON response
          const id = data.data.id;
          console.log('ID:', id);
          localStorage.setItem('new_user_id', id);
          // Redirect to the next page
          window.location.href = `indd.html`;
        }
      });
    })
  .catch(error => {
      console.error('Error:', error);
      // Optionally, handle errors
  });
}