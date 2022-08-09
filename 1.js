btn = document.querySelector('button')
tasks = document.querySelector('.tasks ')
inp = document.querySelector('input')
span = document.querySelectorAll('.tasks .added span')
checkbox = document.querySelectorAll('.tasks .added .icons .inp')

if (localStorage.tasks) {
  arr = JSON.parse(localStorage.tasks)
  addElementsToPage(arr)
} else {
  arr = []
}


btn.onclick = () => {
  if (inp.value.length != 0) {
    addContentToArr(inp.value);
    addElelmentsToLocal(arr)
    inp.value = ""
  }

}
function addContentToArr(x) {
  taskObj = {
    id: Date.now(),
    content: x,
    completed: "notDone",
    checkbox: "notchecked"
  }
  arr.unshift(taskObj)
  addElelmentsToLocal(arr)
  addElementsToPage(arr)
}

function addElementsToPage(arr) {
  tasks.innerHTML = ''
  for (i = 0; i < arr.length; i++) {
    tasks.innerHTML += `
    <div class="added " >
    <span class="content ${arr[i].completed}"data-id="${arr[i].id}">   ${arr[i].content}</span>
    <div class="icons">
    <input class="inp" type="checkbox" ${arr[i].checkbox} onclick=" addactiveclasstolocal(${this.i})">
   <i class="fa fa-trash" aria-hidden="true"
    onclick="delElement(${this.i})"></i></div>
    </div>    
    `
    span = document.querySelectorAll('.tasks .added span')
    checkbox = document.querySelectorAll('.tasks .added .icons .inp')
  }
}
function addElelmentsToLocal(arr) {
  localStorage.setItem('tasks', JSON.stringify(arr))
}

function delElement(i) {
  arr.splice(i, 1)
  addElelmentsToLocal(arr)
  addElementsToPage(arr)
}

function addactiveclasstolocal(i) {
  arr.forEach((e) => {
    if (e.id == span[i].getAttribute('data-id') && e.completed == "notDone") {
      e.completed = "Done"
      e.checkbox = "checked"
    } else if (e.id == span[i].getAttribute('data-id') && e.completed == "Done") {
      e.completed = "notDone"
      e.checkbox = "notchecked"
    }
    addElelmentsToLocal(arr)
    addElementsToPage(arr)
  })
}


