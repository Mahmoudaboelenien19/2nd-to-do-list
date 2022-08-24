let btn = document.querySelector('button');
let tasks = document.querySelector('.tasks ');
let inp = document.querySelector('input');
let instructions = document.querySelector('.instructions');
let mode = "create";
let indexOfUpdatedElement = 0;


setInterval(() => {
  today = new Date();
}, 1000);

time = () => today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
date = () => today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

if (localStorage.tasks) {

  arr = JSON.parse(localStorage.tasks);
  addElementsToPage(arr);
  delAllContent(arr);

} else {
  arr = [];
}


inp.addEventListener("keyup", (e) => {
  if (e.target.value.length == 0) {
    inp.style.cssText = `
 border:none;`;
  }
  else if (e.target.value.length <= 20) {
    inp.style.cssText = `
 border:2px solid green;`;
  } else if (e.target.value.length > 21) {
    inp.style.cssText = `
  border:2px solid red;`;
  }
});


animateF = () => {
  instructions.classList.add("animated");
  setTimeout(() => {
    instructions.classList.remove("animated");
  }, 4000);
};


btn.onclick = () => {

  if (inp.value.trim().length == 0) {
    animateF();
    instructions.innerHTML = 'please add a task';
  } else if (inp.value.length > 20) {
    animateF();
    instructions.innerHTML = `you mustn't exceed 20 letters`;
  } else if (inp.value.trim().length != 0 && inp.value.trim().length <= 20) {

    if (mode == "create") {
      addContentToArr(inp.value.trim());
      inp.value = "";
      inp.style.cssText = `
  border:none;`;
    } else if (mode == "update") {
      arr[indexOfUpdatedElement].content = inp.value.trim();
      arr[indexOfUpdatedElement].t = time();
      arr[indexOfUpdatedElement].d = date();
      arr[indexOfUpdatedElement].m = 'updated in';
      checkbox[indexOfUpdatedElement].style.display = "block";
      mode = "create";
      btn.innerHTML = "add tasks";
      inp.value = "";
      addElelmentsToLocal(arr);
      inp.style.cssText = `
  border:none;`;
    }
  }
};
function update(i) {

  indexOfUpdatedElement = i;
  mode = "update";
  btn.innerHTML = "Update";
  inp.value = arr[i].content;
  inp.focus();
  arr[i].completed = "notDone";
  arr[i].checkbox = "notchecked";
  inp.style.cssText = `
 border:2px solid green;`;
  addElelmentsToLocal(arr);
  checkbox[i].style.display = "none";
}

function addContentToArr(x) {
  taskObj = {
    id: Date.now(),
    content: x,
    completed: "notDone",
    checkbox: "notchecked",
    d: date(),
    t: time(),
    m: 'created in'
  };
  arr.unshift(taskObj);
  addElelmentsToLocal(arr);
  addElementsToPage(arr);
}


function addElementsToPage(arr) {
  tasks.innerHTML = '';
  for (i = 0; i < arr.length; i++) {
    let x = `   
    <div class="added " >
    <div class="content">
    <span class="ss  ${arr[i].completed}"data-id="${arr[i].id}">${arr[i].content}</span></div>
    <div class="icons">
      <div class="inpp"><input class="inp" type="checkbox" ${arr[i].checkbox} onclick=" addactiveclasstolocal(${this.i})">
        <span>done</span></div>
    <div id="update" onclick=update(${this.i})><span>update</span>^</div>
    <div class="deleteSpan"><span>delete</span><i class="fa fa-trash" aria-hidden="true"
    onclick="delElement(${this.i})"></i> </div>   
    </div> 

       <div class="time"> ${arr[i].m} ${arr[i].d} & ${arr[i].t}</div> 
         </div>  
         
    `;
    // tasks.insertAdjacentHTML("beforeend", x)
    tasks.innerHTML += x;
    span = document.querySelectorAll('.tasks .added .ss');
    checkbox = document.querySelectorAll('.tasks .added .icons .inpp .inp');
  }
}
function addElelmentsToLocal(arr) {
  localStorage.setItem('tasks', JSON.stringify(arr));
  delAllContent(arr);
  addElementsToPage(arr);
}

function delElement(i) {
  arr.splice(i, 1);
  addElelmentsToLocal(arr);
  addElementsToPage(arr);
s}

function addactiveclasstolocal(i) {

  arr.forEach((e) => {
    if (e.id == span[i].getAttribute('data-id') && e.completed == "notDone") {
      e.completed = "Done";
      e.checkbox = "checked";
      e.m = "done in";
      e.t = time();
      e.d = date();
    } else if (e.id == span[i].getAttribute('data-id') && e.completed == "Done") {
      e.completed = "notDone";
      e.checkbox = "notchecked";
      e.m = "unchecked in";
      e.t = time();
      e.d = date();
    }
    addElelmentsToLocal(arr);
    addElementsToPage(arr);
  });
}
function delAllContent(arr) {
  delAll = document.getElementById('delAll');
  doneCounter = document.querySelector('#btn .done');
  undoneCounter = document.querySelector('#btn .undone');
  delAll.style.cssText = `display:none;`;
  delAll.innerHTML = `Del All (${arr.length})`;
  doneCounter.innerHTML = `    Done : ${doneState(arr)}`;
  undoneCounter.innerHTML = `Undone : ${(arr.length) - doneState(arr)}`;
  if (arr.length >= 2) {
    delAll.style.cssText = `display:block;
    background-color:red;
    color:white;
    `;
  } else {
    delAll.style.cssText = `display:none;`;
  }

  function doneState(arr) {
    count = 0;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].checkbox == "checked") {
        count += 1;
      }
    }
    return count;
  }

}
delall = () => {
  arr.splice(0);
  addElelmentsToLocal(arr);
  addElementsToPage(arr);
  delAll.style.cssText = `display:none;`;

};


