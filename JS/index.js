var btn = document.getElementById('btn');
var header = document.getElementById('header');
var border = document.getElementById('border');
var hello = document.getElementById('hello');
var two = document.getElementById('desc');
var one = document.getElementById('title');
var search = document.getElementById('search');
var checkbox = document.getElementById('checkbox');
var pending = document.getElementById('pending');
var showe = document.getElementById('show');
var addForm = document.getElementById('border');
var updateForm = document.getElementById('updateForm');
var updateOne = document.getElementById('updateTitle');
var updateTwo = document.getElementById('updateDesc');
updateForm.style.display = 'none';
two.style.display = 'none';
one.addEventListener('input', function () {
    two.style.display = 'block';
});
var userData = JSON.parse(localStorage.getItem('store') || '[]');
print(userData);
btn.addEventListener('click', function () {
    var title = one.value;
    var desc = two.value;
    var obj = {
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
});
function print(store) {
    showe.innerHTML = '';
    store.forEach(function (task, index) {
        var item = document.createElement('div');
        item.className = 'task';
        item.innerHTML = "\n        <div id=\"box\">\n            <div id='complete'>\n                <div>\n                    <input type='checkbox' id='checkbox".concat(index, "' onclick='check(").concat(index, ")' ").concat(task.completed ? 'checked' : '', " ").concat(task.completed ? 'style="display: none"' : '', ">\n                </div>\n                <div>\n                    <p id='pending' style=\"").concat(task.completed ? 'color: green;' : 'color:rgb(240, 129, 129);', "\">\n                        ").concat(task.completed ? "<i style=\"font-size:20px\" class=\"fa\">&#xf00c;</i>" : "<i style=\"font-size:24px\" class=\"fa\">&#xf017;</i>", "\n                    </p>\n                </div>\n                </div>\n                <p id='center' ").concat(task.completed ? 'style="text-decoration: line-through;"' : '', "><strong>").concat(task.title, "</strong></p>\n                <hr>\n                <p id='content'>").concat(task.desc, "</p> \n                <div id='circle' style=\"background-color: ").concat(task.color, ";\"></div> \n                <div class=\"button\">   \n                <i class=\"fa\" id='update' onclick='edit(").concat(index, ")' ").concat(task.completed ? 'style="display: none;"' : '', ">&#xf044;</i>\n                <i class=\"material-icons\" id='delete' onclick='remove(").concat(index, ")' ").concat(task.completed ? 'style="margin-left: 180px;"' : '', ">&#xe872;</i>\n            </div>\n        </div>");
        var circle = item.querySelector('#circle');
        showe.append(item);
    });
}
function edit(index) {
    var task = userData[index];
    updateOne.value = task.title;
    updateTwo.value = task.desc;
    addForm.style.display = 'none';
    updateForm.style.display = 'block';
    var updateButton = document.getElementById('updateButton');
    updateButton.onclick = function () {
        update(index);
        addForm.style.display = 'block';
        updateForm.style.display = 'none';
    };
}
function update(index) {
    var title = updateOne.value;
    var desc = updateTwo.value;
    userData[index].title = title;
    userData[index].desc = desc;
    alert('Todo Updated Successfully');
    localStorage.setItem('store', JSON.stringify(userData));
    print(userData);
}
function random() {
    var random = function () { return Math.floor(Math.random() * 255); };
    var color = "rgb(".concat(random(), ", ").concat(random(), ", ").concat(random(), ")");
    return color;
}
function remove(index) {
    userData.splice(index, 1);
    localStorage.setItem('store', JSON.stringify(userData));
    alert('Todo deleted successfully');
    location.reload();
}
function filterTodo() {
    var filter = search.value;
    var filteredData = userData.filter(function (ele) {
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
