document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const pendingTasksList = document.getElementById('pending-tasks-list');
    const completedTasksList = document.getElementById('completed-tasks-list');

    let tasks = [];

    function renderTasks() {
        pendingTasksList.innerHTML = '';
        completedTasksList.innerHTML = '';

        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.textContent = `${task.text} (${task.date})`;

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('edit');
            editBtn.onclick = () => editTask(task.id);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete');
            deleteBtn.onclick = () => deleteTask(task.id);

            taskItem.appendChild(editBtn);
            taskItem.appendChild(deleteBtn);

            if (task.completed) {
                taskItem.classList.add('completed');
                completedTasksList.appendChild(taskItem);
            } else {
                const completeBtn = document.createElement('button');
                completeBtn.textContent = 'Complete';
                completeBtn.classList.add('complete');
                completeBtn.onclick = () => completeTask(task.id);
                taskItem.appendChild(completeBtn);

                pendingTasksList.appendChild(taskItem);
            }
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const date = new Date().toLocaleString();
        const newTask = {
            id: Date.now(),
            text: taskText,
            date: date,
            completed: false
        };

        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
    }

    function completeTask(taskId) {
        tasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: true, date: new Date().toLocaleString() } : task
        );
        renderTasks();
    }

    function editTask(taskId) {
        const newText = prompt('Edit your task:');
        if (newText) {
            tasks = tasks.map(task =>
                task.id === taskId ? { ...task, text: newText, date: new Date().toLocaleString() } : task
            );
            renderTasks();
        }
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    renderTasks();
});
