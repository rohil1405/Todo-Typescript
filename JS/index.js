"use strict";
let btn = document.getElementById('btn');
let header = document.getElementById('header');
let border = document.getElementById('border');
let hello = document.getElementById('hello');
let two = document.getElementById('desc');
let one = document.getElementById('title');
let search = document.getElementById('search');
let checkbox = document.getElementById('checkbox');
let pending = document.getElementById('pending');
const showe = document.getElementById('show');
const addForm = document.getElementById('border');
const updateForm = document.getElementById('updateForm');
const updateOne = document.getElementById('updateTitle');
const updateTwo = document.getElementById('updateDesc');
updateForm.style.display = 'none';
two.style.display = 'none';
one.addEventListener('input', function () {
    two.style.display = 'block';
});
let userData = JSON.parse(localStorage.getItem('store') || '[]');
print(userData);
btn.addEventListener('click', function () {
    let title = one.value.trim();
    let desc = two.value.trim();
    if (title.length === 0) {
        alert('Please Enter a Todo Title');
    }
    else if (desc.length === 0) {
        alert('Please Enter a Details');
    }
    else {
        let obj = {
            title: title,
            desc: desc,
            completed: false,
            color: random()
        };
        userData.push(obj);
        localStorage.setItem('store', JSON.stringify(userData));
        one.value = '';
        two.value = '';
        two.style.display = 'none';
        alert('Todo added Successfully');
        print(userData);
    }
});
function print(store) {
    showe.innerHTML = '';
    store.forEach((task, index) => {
        const item = document.createElement('div');
        item.className = 'task';
        item.innerHTML = `
        <div id="box">
            <div id='complete'>
                <div>
                    <input type='checkbox' id='checkbox${index}' onclick='check(${index})' ${task.completed ? 'checked' : ''} ${task.completed ? 'style="display: none"' : ''}>
                </div>
                <div>
                    <p id='pending' style="${task.completed ? 'color: green;' : 'color:rgb(240, 129, 129);'}">
                        ${task.completed ? `<i style="font-size:20px" class="fa">&#xf00c;</i>` : `<i style="font-size:24px" class="fa">&#xf017;</i>`}
                    </p>
                </div>
                </div>
                <p id='center' ${task.completed ? 'style="text-decoration: line-through;"' : ''}><strong>${task.title}</strong></p>
                <hr>
                <p id='content'>${task.desc}</p> 
                <div id='circle' style="background-color: ${task.color};"></div> 
                <div class="button">   
                <i class="fa" id='update' onclick='edit(${index})' ${task.completed ? 'style="display: none;"' : ''}>&#xf044;</i>
                <i class="material-icons" id='delete' onclick='remove(${index})' ${task.completed ? 'style="margin-left: 180px;"' : ''}>&#xe872;</i>
            </div>
        </div>`;
        const circle = item.querySelector('#circle');
        showe.append(item);
    });
}
function edit(index) {
    const task = userData[index];
    updateOne.value = task.title;
    updateTwo.value = task.desc;
    addForm.style.display = 'none';
    updateForm.style.display = 'block';
    const updateButton = document.getElementById('updateButton');
    updateButton.onclick = function () {
        update(index);
        addForm.style.display = 'block';
        updateForm.style.display = 'none';
    };
}
function update(index) {
    const title = updateOne.value;
    const desc = updateTwo.value;
    userData[index].title = title;
    userData[index].desc = desc;
    alert('Todo Updated Successfully');
    localStorage.setItem('store', JSON.stringify(userData));
    print(userData);
}
function random() {
    const random = () => Math.floor(Math.random() * 255);
    let color = `rgb(${random()}, ${random()}, ${random()})`;
    return color;
}
function remove(index) {
    userData.splice(index, 1);
    localStorage.setItem('store', JSON.stringify(userData));
    alert('Todo deleted successfully');
    location.reload();
}
function filterTodo() {
    let filter = search.value;
    let filteredData = userData.filter(ele => {
        return ele.title.toLowerCase().includes(filter);
    });
    print(filteredData);
}
function check(index) {
    alert('Please check again!!');
    userData[index].completed = !userData[index].completed;
    localStorage.setItem('store', JSON.stringify(userData));
    print(userData);
}
