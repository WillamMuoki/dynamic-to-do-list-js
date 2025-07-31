document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 🔄 Load existing tasks from localStorage
    loadTasks();

    // ✅ Add task to list and localStorage
    function addTask(taskText, save = true) {
        // Don't add empty tasks
        if (taskText.trim() === '') {
            alert('Please enter a task.');
            return;
        }

        // 1. Create <li> element
        const li = document.createElement('li');
        li.textContent = taskText;

        // 2. Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // 3. Remove task logic
        removeButton.onclick = function () {
            taskList.removeChild(li);
            removeFromLocalStorage(taskText);
        };

        // 4. Append elements
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // 5. Save to localStorage (if not loading from it)
        if (save) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // 6. Clear input field if it came from user
        if (save) {
            taskInput.value = '';
        }
    }

    // 🔁 Load tasks on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => {
            addTask(task, false); // false means don't save again to avoid duplication
        });
    }

    // ❌ Remove task from localStorage
    function removeFromLocalStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // ➕ Event listener for add button
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    });

    // ⌨️ Add with Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
        }
    });
});
