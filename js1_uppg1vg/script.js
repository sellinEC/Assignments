let users = [
  // {
  //   id: "1",
  //   namn: 'Förnamn',
  //   efternamn: 'Efternamn',
  //   email: 'förnamn.efternamn@mail.com'
  // },
  // {
  //   id: "2",
  //   namn: 'Förnamn2',
  //   efternamn: 'Efternamn2',
  //   email: 'förnamn2.efternamn2@mail.com'
  // },
  // {
  //   id: "3",
  //   namn: 'Förnamn3',
  //   efternamn: 'Efternamn3',
  //   email: 'förnamn3.efternamn3@mail.com'
  // }
]

const form = document.getElementById('form');
const button = document.getElementById('button')
const saveBtn = document.getElementById('save')
const namn = document.getElementById('namn');
const efternamn = document.getElementById('efternamn');
const email = document.getElementById('email');
const output = document.querySelector('#users');

let position = 0
let userId = 0


// const deleted = document.querySelector('#delete')



button.addEventListener('click', (e) => {
  e.preventDefault();

  checkInputs();


});

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


      }
    }
  } else {
    setErrorFor(email, 'Ogiltig email');

  }

}

saveBtn.addEventListener('click', (e) => {
  e.preventDefault()
  checkEditedInputs()
})

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
  } else if (!isEmail(emailInput)) {
    setErrorFor(email, 'Ogiltig mailadress')

  } else {
    setSuccessFor(email);
  }


  // add user:
  let elementsArray = document.getElementsByClassName("success");

  if (elementsArray.length === 3) {
    removeUser(position)
    console.log(users);
    addEditedUser(position)
    namn.value = ''
    efternamn.value = ''
    email.value = ''


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

    <p id="small">${user.email}</p>
    <i class="fas fa-pen-square" id="edit"></i>
    <i class="far fa-times-circle" id="delete"></i>
  </div > `
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

function addEditedUser(position) {
  let user = {
    id: userId,
    namn: namn.value.trim(),
    efternamn: efternamn.value.trim(),
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
}

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

    // target = e.target.parentElement
    // console.log(target);
    // editUser(target)
  }

})

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

// users.forEach(user => {

//   if (user.email == input) {
//     
//     return true;
//   } else {
//    
//     return false
//   }
// });


listUsers()
// removeUser(1)
// console.log(users);

// console.log(Boolean(isUser("förnamn3.efternamn3@mail.com")));
