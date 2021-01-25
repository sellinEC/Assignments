const form = document.getElementById('form');
const input = document.getElementById('input');
const output = document.getElementById('output');
// const h3 = document.querySelectorAll()
// const btn = document.getElementById('done')
error = document.getElementById('small')
todos= []


//Eventlisteners


form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(input.value === '') {
    error.innerText = 'Skriv det om du tänkte göra det'
  }else{
    
    error.innerText = ''
    addTodo(input.value);
    listTodos();
    input.value= ''
  }
 
})

output.addEventListener('click', (e) => {
toggleForDelete(e)
})


getTodos();



//Functions



async function getTodos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10 ');
  console.log(res);
  const data = await res.json();
  console.log(data);
  todos = data
  console.log(todos);
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
data.id = Date.now()   //custom ID?
// console.log(data);
// todos.unshift(data);
listTodos();
}

function toggleForDelete(e) {
  if(e.target.id === "delete"){
    console.log(e.target.parentElement.id +" " +"deleteknapp!");
    todos = todos.filter(todo => todo.id !== parseInt(e.target.parentElement.id))
    todos.forEach(todo => {
      console.log(todo.id);
    })
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
  
        // console.log(todo);
        
      }
      listTodos();
  })

  }
}

function listTodos() {
  output.innerHTML = ''
  todos.forEach(todo => {
  if(todo.completed === false) {
    output.innerHTML +=
    `
    <div id="${todo.id}" class="todo shadow-sm p-2 mt-4 d-flex justify-content-between">
      <p>${todo.title}</p>
    </div>
    `
  }else{
    // console.log(todo.completed);
    output.innerHTML +=
    `
    <div class="holder">
    <div id="${todo.id}" class="done todo shadow-sm p-2 mt-4 d-flex justify-content-between">
      <p>${todo.title}</p>
      <i class="fas fa-trash-alt" id="delete"></i>
    </div>
    <div class="overlay">DONE</div>
    </div>
    `
  }
  
  });
}