/*

RESTful routing convention

Resources - The things that the app allows you to interact with

Example resources:
  - Todos
  - Users
  - Posts
  - Songs
  - Playlists
  - Classified Ad

App interfaces are answering the question: "How do I do stuff to my resources?"

- Add/remove items
- Play songs
- Display a photo
- Favorite/like an item
- Compare items
- Rank things

CRUD - Create, Read, Update, Delete
BREAD - Browse, Read, Edit, Add, Delete

Routes for Todos:

Root: /todos

1) Am I asking to _LOOK_ at something? Or to _CHANGE_ something?
LOOK -> GET
CHANGE -> POST

2) Am I asking to interact with the _COLLECTION_, or an _ENTRY_ in the collection?
COLLECTION -> Specify the resource
ENTRY -> Specify the resource and an ID

GET /todos                     Browse: Look at all of the todos
GET /todos/:some_id            Read: ~~Look at an individual todo~~
POST /todos/:some_id           Edit: Change the text of a todo
POST /todos                    Add: Create a new todo
POST /todos/:some_id/delete    Delete: Remove a todo from the collection

GET /lists                     Browse: Look at all of the lists
GET /lists/:some_id            Read: ~~Look at an individual todo~~
POST /lists/:some_id           Edit: Change the text of a todo
POST /lists                    Add: Create a new todo
POST /lists/:some_id/delete    Delete: Remove a todo from the collection

GET /users                     Browse: Look at all of the users
GET /users/:some_id            Read: ~~Look at an individual todo~~
POST /users/:some_id           Edit: Change the text of a todo
POST /users                    Add: Create a new todo
POST /users/:some_id/delete    Delete: Remove a todo from the collection

*/

const todos = [
  "Get milk",
  "Wash car",
  "Walk dog",
];

function addTodo(todo) {
  todos.push(todo);
}

function removeTodo(idx) {
  if (!todos[idx]) throw new Error(`No todo at index ${idx}!`);
  todos.splice(idx, 1);
}

function updateTodo(idx, newText) {
  if (!todos[idx]) throw new Error(`No todo at index ${idx}!`);
  todos[idx] = newText;
}

function viewTodos() {
  return `
  <h1>Todos:</h1>
  <ul>
  ${todos.map((todo, idx) => `
    <li>
      ${todo} [${idx}]
      <form method='POST' action='/todos/${idx}'>
        <input name='updatedTodoText'>
        <button>📝</button>
      </form>
      <form method='POST' action='/todos/${idx}/delete'>
        <button>➖</button>
      </form>
    </li>
  `).join('\n')}
  </ul>
  <form method='POST' action='/todos'>
    <input name='newTodoText' placeholder='Add a todo'>
    <button>➕</button>
  </form>
  `;
}

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => { response.redirect('/todos') });

// GET /todos                     Browse: Look at all of the todos
app.get('/todos', (request, response) => { response.send(viewTodos()) });

// POST /todos/:some_id           Edit: Change the text of a todo
app.post('/todos/:id', (request, response) => {
  const { id } = request.params;
  const { updatedTodoText } = request.body;
  updateTodo(id, updatedTodoText);
  response.redirect('/');
});

// POST /todos Add: Create a new todo
app.post('/todos', (request, response) => {
  // const newTodoText = request.body.newTodoText;
  const { newTodoText } = request.body;
  addTodo(newTodoText);
  response.redirect('/');
});

// POST /todos/:some_id/delete    Delete: Remove a todo from the collection
app.post('/todos/:indexOfTodo/delete', (request, response) => {
  const { indexOfTodo } = request.params;
  removeTodo(indexOfTodo);
  response.redirect('/');
});


app.listen(8080);
