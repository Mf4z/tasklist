// Define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load all event listeneres 

loadEventListeners();

//DOM event load
document.addEventListener('DOMContentLoaded',getTasks);

//Load all even listeners declaration
function loadEventListeners(){
    //Add task even 
form.addEventListener('submit',addTask);

//Remove task even 
taskList.addEventListener('click',removeTask);

//Clear tasks
clearBtn.addEventListener('click',clearTasks);

//Filter
filter.addEventListener('keyup',filterTasks);

}


//Get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){

        //Create li element 
    const li = document.createElement('li');
    
    //Add classname 
    li.className = 'collection-item';

    //Create text node and append to li
    li.appendChild(document.createTextNode(task));

    //Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    //Add  icon html
    link.innerHTML='<i class="fa fa-remove"></i>';

    //Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);


    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Add task
function addTask(e){

    if(taskInput.value === '')
        alert('Add a task');

    //Create li element 
    const li = document.createElement('li');
    
    //Add classname 
    li.className = 'collection-item';

    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    //Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    //Add  icon html
    link.innerHTML='<i class="fa fa-remove"></i>';

    //Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    //Store in LS
    storeTaskInLocalStorage(taskInput.value);

    
    //clear input 
    taskInput.value = '';

    e.preventDefault();
}


//Store in Ls
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Remove task
function removeTask(e){

if(e.target.parentElement.classList.contains('delete-item') )
{
    if(confirm('Are You Sure?'))
    e.target.parentElement.parentElement.remove();

    //Remove From LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);

}
    console.log(e.target);
}

//Remove from LS defination
function removeTaskFromLocalStorage(taskItem){
    console.log(taskItem);

    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}


//Clear tasks
function clearTasks(e){
    //Way one of clearing
    taskList.innerHTML = '';

    //Faster way 
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //Clear From Local Storage
    clearTaskFromLocalStorage();
}

//Clear Task from Ls
function clearTaskFromLocalStorage(){
    localStorage.clear();
}

//Filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    console.log(text);
    document.querySelectorAll('.collection-item').forEach
    (function(task){

     const item = task.firstChild.textContent   
     if(item.toLowerCase().indexOf(text) != -1){
            task.style.display='block';
     }
     else{
        task.style.display='none'; 
     }

});
}