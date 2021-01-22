const form = document.getElementById('form');
const input = document.getElementById('input');
const output = document.getElementById('output');
error = document.getElementById('small')
todos= []

async function getTodos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos ');
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
    // body: 'bar',
    // userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
const data = await res.json();
console.log(data);
todos.unshift(data);
listTodos();
}

function listTodos() {
  output.innerHTML = ''
  todos.forEach(todo => {
  output.innerHTML +=
  `
  <div class="todo shadow-sm p-2 m-3 d-flex justify-content-between">
  <p>${todo.title}</p>

  
</div>
  `

  });
}

function setError() {
  error.innerText ="Skriv vad du vill göra om du ska göra nåt"
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(input.value === '') {
    error.innerText = 'Skriv det om du tänkte göra det'
  }else{
    error.innerText = ''
    addTodo(input.value);
    listTodos();
  }
 
})

getTodos();

