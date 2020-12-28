const form = document.getElementById('form');
button = document.getElementById('button')
const namn = document.getElementById('namn');
const efternamn = document.getElementById('efternamn');
const email = document.getElementById('email');


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