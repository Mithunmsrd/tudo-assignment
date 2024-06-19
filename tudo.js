document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');

    // Fetch all todos when page loads
    axios.get('/todos')
        .then(response => {
            response.data.forEach(todo => {
                addTodoElement(todo);
            });
        })
        .catch(error => {
            console.error('Error fetching todos:', error);
        });

    // Handle form submission for adding new todo
    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const todoText = todoInput.value.trim();

        if (todoText) {
            axios.post('/todos', { text: todoText })
                .then(response => {
                    addTodoElement(response.data);
                    todoInput.value = '';
                })
                .catch(error => {
                    console.error('Error adding todo:', error);
                });
        }
    });

    // Function to add a todo item to the list
    function addTodoElement(todo) {
        const todoElement = document.createElement('li');
        todoElement.id = `todo-${todo.id}`;
        todoElement.className = 'flex justify-between items-center border-b-2 border-gray-200 py-2';

        const todoText = document.createElement('span');
        todoText.textContent = todo.text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'bg-red-500 text-white px-2 py-1 rounded';
        deleteButton.addEventListener('click', function() {
            axios.delete(`/todos/${todo.id}`)
                .then(() => {
                    todoElement.remove();
                })
                .catch(error => {
                    console.error('Error deleting todo:', error);
                });
        });

        todoElement.appendChild(todoText);
        todoElement.appendChild(deleteButton);
        todoList.appendChild(todoElement);
    }
});
