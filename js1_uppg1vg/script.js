


//selectors och variabler
const form = document.getElementById('form');
const button = document.getElementById('button')
const saveBtn = document.getElementById('save')
const namn = document.getElementById('namn');
const efternamn = document.getElementById('efternamn');
const email = document.getElementById('email');
const output = document.querySelector('#users');
let users = []
let position = 0
let userId = 0




//Event listeners
form.addEventListener('keyup', (e) => {
  if (e.code === 'Enter' && button.disabled) {
    e.preventDefault();
    // form.submit()
    checkEditedInputs()
  }
});

form.addEventListener('submit', (e) => {
  if (button.disabled) {
    e.preventDefault();
    checkEditedInputs()
  } else {
    e.preventDefault();
    checkInputs()
  }


});





output.addEventListener('click', (e) => {
  if (e.target.id === "delete") {
    console.log(e.target.parentElement.parentElement.id);
    console.log(e);
    users = users.filter(user => user.id !== e.target.parentElement.id);

    listUsers();
  } else if (e.target.id === "edit") {
    users.forEach(user => {
      if (user.id === e.target.parentElement.id) {
        editUser(user)
      }

    });

  }

})

saveBtn.addEventListener('click', (e) => {
  e.preventDefault()
  checkEditedInputs()
})





//Functions

function checkInputs() {
  //get values:
  // const formControl = input.parentElement;
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

  } else if (isEmail(emailInput)) {

    if (isUser(emailInput)) {
      setErrorFor(email, 'Användaren existerar redan');

    } else {

      setSuccessFor(email);
      let elementsArray = document.getElementsByClassName("success");

      if (elementsArray.length === 3) {
        addUser()
        namn.value = ''
        efternamn.value = ''
        email.value = ''
        console.log(users);
        namn.parentElement.className = 'form-control'
        efternamn.parentElement.className = 'form-control'
        email.parentElement.className = 'form-control'


      }
    }
  } else {
    setErrorFor(email, 'Ogiltig email');

  }

}





function checkEditedInputs() {
  const namnInput = namn.value.trim()
  const efternamnInput = efternamn.value.trim()
  const emailInput = email.value.trim()

  if (namnInput === '') {
    setErrorFor(namn, 'Namn kan inte vara tomt')
  } else {
    setSuccessFor(namn);
  }
  if (efternamnInput === '') {

    setErrorFor(efternamn, 'Efternamn kan inte vara tomt')
  } else {

    setSuccessFor(efternamn);
  }

  if (emailInput === '') {

    setErrorFor(email, 'Fältet kan inte lämnas tomt')
  } else if (isEmail(emailInput)) {

    if (currentEmail(position) != emailInput && isUser(emailInput)) {

      setErrorFor(email, 'Mailadressen används redan')
    } else {

      setSuccessFor(email);
      // add user:
      let elementsArray = document.getElementsByClassName("success");

      if (elementsArray.length === 3) {
        removeUser(position)
        console.log(users);
        addEditedUser(position)

        // form cleanup
        namn.value = ''
        efternamn.value = ''
        email.value = ''
        saveBtn.style.visibility = 'hidden'
        button.style.visibility = 'visible'
        disabler(saveBtn, button)
        namn.parentElement.className = 'form-control'
        efternamn.parentElement.className = 'form-control'
        email.parentElement.className = 'form-control'


      }
    }

  } else {

    setErrorFor(email, 'Ogiltig mailadress')
  }

}


function removeUser(position) {
  users.splice(position, 1);

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
    output.innerHTML += `<div div id = "${user.id}" class= "user" >
    <p>${user.namn} ${user.efternamn}</p>

    <p id="small"><a href="">${user.email}</a></p>
    <i class="fas fa-pen-square" id="edit"></i>
    <i class="far fa-times-circle" id="delete"></i>
  </div > `
  })

}

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function addUser() {
  let user = {
    id: Date.now().toString(),
    namn: capFirst(namn.value.trim()),
    efternamn: capFirst(efternamn.value.trim()),
    email: email.value.trim()
  }
  users.push(user);
  listUsers();
}


function addEditedUser(position) {
  let user = {
    id: userId,
    namn: capFirst(namn.value.trim()),
    efternamn: capFirst(efternamn.value.trim()),
    email: email.value.trim()
  }
  users.splice(position, 0, user);
  listUsers();
}


function editUser(target) {
  namn.value = target.namn
  efternamn.value = target.efternamn
  email.value = target.email;
  userId = target.id;
  position = findIndex(userId);
  console.log("vid position" + " " + position);
  console.log("id: " + userId);
  saveBtn.style.visibility = 'visible'
  button.style.visibility = 'hidden'
  disabler(button, saveBtn)

}



function isUser(input) {
  for (let i = 0; i < users.length; i++) {

    const user = users[i];
    let tester = 0
    if (user.email === input) {
      tester += 1
    }
    if (tester > 0) {
      return true
    }

  }
}

function findIndex(id) {
  for (let i = 0; i < users.length; i++) {
    const usr = users[i];
    if (usr.id === id) {
      return users.indexOf(usr);
    }

  }
}

function currentEmail(position) {
  return users[position].email
}

function disabler(knapp1, knapp2) {
  knapp1.disabled = true;
  knapp2.disabled = false;
}

