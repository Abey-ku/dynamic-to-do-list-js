document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Assuming you have an HTML element with an id 'myElement'
    const element = document.getElementById('myElement');

// Add a CSS class to this element
     element.classList.add('new-class');


    // Function to add a new task
    function addTask(taskText, save = true) {
        // Create a new list item element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Event listener for the remove button
        removeButton.onclick = function() {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(taskText);
        };

        // Append the remove button to the list item
        li.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Save the task to Local Storage if not loading from storage
        if (save) {
            saveTaskToLocalStorage(taskText);
        }
    }

    // Function to save a task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Event listener for the add button
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
        addTask(taskText);
        taskInput.value = '';
    });

    // Event listener for pressing the Enter key in the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }
            addTask(taskText);
            taskInput.value = '';
        }
    });

    // Load tasks from Local Storage on DOMContentLoaded
    loadTasks();
});
