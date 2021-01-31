//Variabler
const form = document.getElementById('form');
const input = document.getElementById('input');
const output = document.getElementById('output');
let error = document.getElementById('small')

let todos= []




//Eventlisteners




form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(input.value.trim().length < 1 ) { //tack, blev en smula renare.
    error.innerText = 'Skriv det om du tänkte göra det'
  }else{
    
    error.innerText = ''
    addTodo(input.value);
    listTodos();
    input.value= ''
  }
 input.focus();
})



output.addEventListener('click', (e) => {
toggleForDelete(e)
})





getTodos();





//Functions

function listTodos() {
  output.innerHTML = ''
  todos.forEach(todo => {
  if(todo.completed === false) {
    output.innerHTML +=
    `
    <div id="${todo.id}" class="todo shadow-sm p-2 mt-4 d-flex justify-content-between">
      <p id="${todo.id}">${todo.title}</p>
    </div>
    `
  }else{
   
    output.innerHTML +=
    `
    <div class="holder animate">
    <div id="${todo.id}" class="done todo shadow-sm p-2 mt-4 d-flex justify-content-between animate">
      <p id="${todo.id}">${todo.title}</p>
      <i class="fas fa-trash-alt" id="delete"></i>
    </div>
    <div id="${todo.id}" class="overlay">DONE</div>
    </div>
    `
  }
  
  });
}


async function getTodos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10 ');

  const data = await res.json();
 
  todos = data
  
  listTodos();
}

async function addTodo(input) {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
  method: 'POST',
  body: JSON.stringify({
    title: input,
    completed : false
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
const data = await res.json();
data.id = Date.now()  
todos.unshift(data);
listTodos();
}






function toggleForDelete(e) {
  if(e.target.id === "delete"){
    console.log(e.target.parentElement.id +" " +"deleteknapp!");
    todos = todos.filter(todo => todo.id !== parseInt(e.target.parentElement.id))
    listTodos();

  }else{
  console.log(e.target.id);

    todos.forEach(todo => {
      if (parseInt(e.target.id) === todo.id) {
        if(todo.completed === true){
          todo.completed = false;
        }else{
          todo.completed = true;
        }

        
      }
      listTodos();
    })
}
}

