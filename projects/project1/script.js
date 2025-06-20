// /projects/project1/script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => createTaskElement(task.text, task.completed));
    };

    // Save tasks to Local Storage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Create a new task element in the DOM
    const createTaskElement = (taskText, isCompleted) => {
        const li = document.createElement('li');
        if (isCompleted) {
            li.classList.add('completed');
        }

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('task-buttons');
        
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn');
        completeBtn.innerHTML = '✔';

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '✖';

        buttonContainer.appendChild(completeBtn);
        buttonContainer.appendChild(deleteBtn);

        li.appendChild(taskSpan);
        li.appendChild(buttonContainer);
        taskList.appendChild(li);
    };

    // Event Listener for adding a new task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();

        if (taskText) {
            createTaskElement(taskText, false);
            saveTasks();
            taskInput.value = '';
        }
    });

    // Event Listener for completing or deleting a task (using event delegation)
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            e.target.closest('li').remove();
            saveTasks();
        } else if (e.target.classList.contains('complete-btn')) {
            e.target.closest('li').classList.toggle('completed');
            saveTasks();
        }
    });
    
    // Initial load of tasks
    loadTasks();
});