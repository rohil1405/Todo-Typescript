let btn = document.getElementById('btn') as HTMLButtonElement;
let header = document.getElementById('header') as HTMLDivElement;
let border = document.getElementById('border') as HTMLDivElement;
let hello = document.getElementById('hello') as HTMLHeadingElement;
let two = document.getElementById('desc') as HTMLTextAreaElement;
let one = document.getElementById('title') as HTMLInputElement;
let search = document.getElementById('search') as HTMLInputElement;
let checkbox = document.getElementById('checkbox') as HTMLInputElement;
let pending = document.getElementById('pending') as HTMLParagraphElement;
const showe = document.getElementById('show') as HTMLDivElement;
const addForm = document.getElementById('border') as HTMLDivElement;
const updateForm = document.getElementById('updateForm') as HTMLDivElement;
const updateOne = document.getElementById('updateTitle') as HTMLInputElement;
const updateTwo = document.getElementById('updateDesc') as HTMLInputElement;

updateForm.style.display = 'none';
two.style.display = 'none';
one.addEventListener('input', function () {
    two.style.display = 'block';
});


type uData = {
    title: string,
    desc: string,
    completed: boolean
    color: string
}

let userData: uData[] = JSON.parse(localStorage.getItem('store') || '[]');
print(userData);

btn.addEventListener('click', function () {
    let title = one.value;
    let desc = two.value;

    if (title.length === 0) {
        alert('Please Enter a Todo Title')
    } else if (desc.length === 0) {
        alert('Please Enter a Details')
    } else {

        let obj: uData = {
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

function print(store: uData[]) {
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
        const circle = item.querySelector('#circle') as HTMLElement;
        showe.append(item);
    });
}

function edit(index: number) {
    const task = userData[index];
    updateOne.value = task.title;
    updateTwo.value = task.desc;

    addForm.style.display = 'none';
    updateForm.style.display = 'block';

    const updateButton = document.getElementById('updateButton') as HTMLButtonElement;
    updateButton.onclick = function () {
        update(index);
        addForm.style.display = 'block';
        updateForm.style.display = 'none';
    };
}
function update(index: number) {
    const title: string = updateOne.value;
    const desc: string = updateTwo.value;

    userData[index].title = title;
    userData[index].desc = desc;

    alert('Todo Updated Successfully');

    localStorage.setItem('store', JSON.stringify(userData));
    print(userData);
}

function random() {
    const random = () => Math.floor(Math.random() * 255);
    let color = `rgb(${random()}, ${random()}, ${random()})`
    return color;
}

function remove(index: number) {
    userData.splice(index, 1);
    localStorage.setItem('store', JSON.stringify(userData));
    alert('Todo deleted successfully');
    location.reload();
}

function filterTodo() {
    let filter: string = search.value;
    let filteredData = userData.filter(ele => {
        return ele.title.toLowerCase().includes(filter);
    })
    print(filteredData);
}


function check(index: number) {
    alert('Please check again!!')
    userData[index].completed = !userData[index].completed;
    localStorage.setItem('store', JSON.stringify(userData));
    print(userData);
}
