document.addEventListener('DOMContentLoaded', function () {

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // 1. Create a new li element and set its textContent
        const li = document.createElement('li');
        li.textContent = taskText;

        // 2. Create a new button element for removing the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // 3. Assign an onclick event to remove the li
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // 4. Append the remove button to the li
        li.appendChild(removeBtn);

        // 5. Append the li to the taskList
        taskList.appendChild(li);

        // 6. Clear the task input field
        taskInput.value = "";
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});
