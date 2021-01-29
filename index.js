const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn =  document.querySelector(".footer button");

inputBox.onkeyup = () =>{
    let userData = inputBox.value;
    if (userData.trim() != 0) {
        addBtn.classList.add("active");
    }else{
        addBtn.classList.remove("active");
    }
}
showTasks();
// add task button
addBtn.onclick = () =>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage == null) {
        listArr = [];       
    }
    else{
        listArr = JSON.parse(getLocalStorage);//transforming json string into a js object
    }
    listArr.push(userData);// pushing or adding user data
    localStorage.setItem("New Todo",JSON.stringify(listArr)); //transforming js object into a json string
    showTasks();
    addBtn.classList.remove("active");
}  

function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo");
    if (getLocalStorage == null) {
        listArr = [];      
    }else{
        listArr = JSON.parse(getLocalStorage);//transforming json string into a js object
    }
    const pendingnumb = document.querySelector(".pendingNumb");
    pendingnumb.textContent = listArr.length;
    if (listArr.length > 0) {
        deleteAllBtn.classList.add("active");
    }else{
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag ='';
    listArr.forEach((element,index) => {
        newLiTag += `<li> ${element} <span onclick ="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML =  newLiTag;
    inputBox.value = "";
}

//delete task function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index,1);
    //after remove the li again update the local storage
    localStorage.setItem("New Todo",JSON.stringify(listArr)); //transforming js object into a json string
    showTasks();   
}

// delete all the task function
deleteAllBtn.onclick = () =>{
    listArr = [];
    localStorage.setItem("New Todo",JSON.stringify(listArr)); //transforming js object into a json string
    showTasks();   
}