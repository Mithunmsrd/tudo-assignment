const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

let todos = [];
let nextId = 1;

app.use(cors());
app.use(bodyParser.json());

// GET all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// GET todo by ID
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);

    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// POST new todo
app.post('/todos', (req, res) => {
    const { text } = req.body;
    const newTodo = { id: nextId++, text };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT update todo by ID
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { text } = req.body;
    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex !== -1) {
        todos[todoIndex].text = text;
        res.json(todos[todoIndex]);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// DELETE todo by ID
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
