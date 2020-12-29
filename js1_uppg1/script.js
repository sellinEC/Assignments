let users = [
  // {
  //   id: '1',
  //   namn: 'Förnamn',
  //   efternamn: 'Efternamn',
  //   email: 'Email@domain.ca'
  // },
  // {
  //   id: '2',
  //   namn: 'Ronnt',
  //   efternamn: 'Jansson',
  //   email: 'Email@domain.se'
  // },
  // {
  //   id: '3',
  //   namn: 'Fernamn',
  //   efternamn: 'Aftternamn',
  //   email: 'Email@domain.com'
  // }
]

const form = document.getElementById('form');
const button = document.getElementById('button')
const namn = document.getElementById('namn');
const efternamn = document.getElementById('efternamn');
const email = document.getElementById('email');
const output = document.getElementById('users')


button.addEventListener('click', (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  //get values:
  const namnInput = namn.value.trim()
  const efternamnInput = efternamn.value.trim()
  const emailInput = email.value.trim()

  if (namnInput === '') {
    //error
    //add error class
    setErrorFor(namn, 'Du måste skriva ditt namn')
  } else {
    //sucess class
    setSuccessFor(namn);
  }
  if (efternamnInput === '') {

    setErrorFor(efternamn, 'Du måste skriva ditt efternamn')
  } else {

    setSuccessFor(efternamn);
  }

  if (emailInput === '') {

    setErrorFor(email, 'Skriv din email')
  } else if (!isEmail(emailInput)) {
    setErrorFor(email, 'Ogiltig mailadress')


  } else {
    setSuccessFor(email);
  }

  //add user:
  let elementsArray = document.getElementsByClassName("success");

  if (elementsArray.length === 3) {
    addUser()
    console.log("added user");
    console.log(elementsArray);
    namn.value = ''
    efternamn.value = ''
    email.value = ''

  }

}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');

  //error message
  small.innerText = message;
  //classchange
  formControl.className = 'form-control error'
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success'
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function listUsers() {
  output.innerHTML = ''
  users.forEach(user => {
    output.innerHTML += `<div class="user">
    <p>${user.namn} ${user.efternamn}</p>
    <p id="small">${user.email}</p>
  </div>`
  })

}

function addUser() {
  let user = {
    id: Date.now().toString(),
    namn: namn.value.trim(),
    efternamn: efternamn.value.trim(),
    email: email.value.trim()
  }
  users.push(user);
  listUsers();
}

listUsers();