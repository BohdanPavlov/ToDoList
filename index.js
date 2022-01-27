const addTaskButton = document.querySelector('#add-task-btn')
const descTaskInput = document.querySelector('#description-task')
const tasksWrapper = document.querySelector('.todos-wrapper')

let tasks
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

let todoItemElems = []

class Task{
    constructor(description) {
        this.description = description;
        this.completed = false;
    }
}

addTaskButton.addEventListener('click', pushNewTask)

function pushNewTask(){
    tasks.push(new Task(descTaskInput.value))
    updateLocalStorage()
    fillTodosList()
    descTaskInput.value = ''
}

const updateLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const createTaskTemplate = (task, index) => {
    return `
    <div class="todo-item ${task.completed ? 'checked' : ''}">
        <div class="description">${task.description}</div>
        <div class="buttons">
            <input onclick="completeTask(${index})" type="checkbox" class="btn-complete" ${task.completed ? 'checked' : ''}>
            <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
        </div>
    </div>   
    `
}

const filterCompletedTaskToEnd = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed === false)
    const completedTasks = tasks.length && tasks.filter(item => item.completed === true)
    tasks = [...activeTasks,...completedTasks]
}

const fillTodosList = () => {
    tasksWrapper.innerHTML = ''
    if (tasks.length > 0){
        filterCompletedTaskToEnd()
        tasks.forEach( (item, index) =>{
            tasksWrapper.innerHTML += createTaskTemplate(item,index)
        })
        todoItemElems = document.querySelectorAll('.todo-item')
    }
}

fillTodosList()

const completeTask = (index) => {
    tasks[index].completed = !tasks[index].completed
    if (tasks[index].completed){
        todoItemElems[index].classList.add('checked')
    }else{
        todoItemElems[index].classList.remove('checked')
    }
    updateLocalStorage()
    fillTodosList()
}

const deleteTask = (index) => {
    todoItemElems[index].classList.add('deletion-animation')
    setTimeout(() => {
        tasks.splice(index, 1)
        updateLocalStorage()
        fillTodosList()
    },500)
}


