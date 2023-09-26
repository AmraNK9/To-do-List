//Assign Dom
const input_text = document.querySelector("#new-task");
const addBtn = document.querySelector("#add");
const todo = document.querySelector("#incomplete-tasks");
const completed = document.querySelector("#completed-tasks");

// local storage setup
let todolist_item_string =
  localStorage.getItem("todo") || '[]';
let todolist_item = JSON.parse(todolist_item_string);
for (let i = 0; i < todolist_item.length; i++) {
  todo.innerHTML += `<li><input type="checkbox"><label>${todolist_item[i]}</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>`;
}
// let complete_item;
let complete_item_string = 
  localStorage.getItem('complete') || '[] '
 let  complete_item = JSON.parse(complete_item_string)
for(let i = 0; i < complete_item.length; i++){
  completed.innerHTML += `			<li><input type="checkbox" checked><label>${complete_item[i]}</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>
  `
}

//checkbox in to do
var checkBox_in_to_do = todo.querySelectorAll("input[type=checkbox]");
//checkbox in complete
var checkbox_in_completed = completed.querySelectorAll("input[type=checkbox]");

//Define Varible
let input_text_Value = null;

//Define Function
checkbox_in_completed.forEach((el) => {
  el.addEventListener("click", (e) => {
    if (e.target.checked == false) {
      todo.innerHTML += `<li><input type="checkbox"><label>${e.target.nextElementSibling.innerHTML}</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>`;
      try {
        completed.removeChild(e.target.parentElement);
      } catch (error) {
        console.log(error);
      }
      reListenToDo();
    }
  });
});
// checkBox_in_to_do.forEach((el)=>{
//   el.addEventListener('click',(e)=>{
  
//   })
// })
function reListenCompleted() {
  checkbox_in_completed = completed.querySelectorAll("input[type=checkbox]");
  checkbox_in_completed.forEach((el) => {
    el.addEventListener("click", (e) => {
      if (e.target.checked == false) {
        todo.innerHTML += `<li><input type="checkbox"><label>${e.target.nextElementSibling.innerHTML}</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>`;
        try {
          completed.removeChild(e.target.parentElement);
        } catch (error) {
          console.log(error);
        }
        reListenToDo();
      }
    });
  });
}

function reListenToDo() {
  checkBox_in_to_do = todo.querySelectorAll("input[type=checkbox]");
  checkBox_in_to_do.forEach((el) => {
    el.addEventListener("click", (e) => {
      if (e.target.checked == true) {
        completed.innerHTML += `<li><input type="checkbox" checked><label>${e.target.nextElementSibling.innerHTML}</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>`;
        try {
          todo.removeChild(e.target.parentElement);
        } catch (error) {
          console.log(error);
        }
        reListenCompleted();
      }
    });
  });
}
function input_text_Value_assign() {
  input_text_Value = input_text.value;
}
function toIncomplete() {
  if (input_text_Value != null) {
    todo.innerHTML += `<li><input type="checkbox"><label>${input_text_Value}</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>`;
    todolist_item.push(input_text_Value)
    
    localStorage.setItem('todo',JSON.stringify(todolist_item))
    input_text_Value = null;
    input_text.value = "";
  }
}

//add next slibling ele value to incomplete2
function toIncomplete2(val) {
  todo.innerHTML += `<li><input type="checkbox"><label>${val}</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>`;
}
//add next slibing ele value to complete
function toComplete(val) {
  completed.innerHTML += `<li><input type="checkbox" checked><label>${val}</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>`;
}

function Check_Incompleted() {
  checkbox_in_completed = completed.querySelectorAll("input[type=checkbox]");

  checkbox_in_completed.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      console.log(ele.nextElementSibling.innerHTML);
      if (ele.checked == false) {
        completed.removeChild(ele.parentElement);
        toIncomplete2(ele.nextElementSibling.innerHTML);

        toIncomplete();

        checkBox_in_to_do = todo.querySelectorAll("input[type=checkbox]");
        checkbox_in_completed = completed.querySelectorAll(
          "input[type=checkbox]"
        );

        checkBox_in_to_do.forEach((ele) => {
          ele.addEventListener("click", (e) => {
            console.log(e.target.checked);
            if (e.target.checked == true) {
              toComplete(e.target.nextElementSibling.innerHTML);
              todo.removeChild(e.target.parentElement);
              Check_Incompleted();
            }
          });
        });
      }
    });
  });
}

//Event Setup

//assign value  when input text change
input_text.addEventListener("keydown", input_text_Value_assign);

//add list to todolist tag when add button click
addBtn.addEventListener("click", () => {
  toIncomplete();

  checkBox_in_to_do = todo.querySelectorAll("input[type=checkbox]");
  checkbox_in_completed = completed.querySelectorAll("input[type=checkbox]");

  checkBox_in_to_do.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      console.log(e.target.checked);
      if (e.target.checked == true) {
        toComplete(e.target.nextElementSibling.innerHTML);
        todo.removeChild(e.target.parentElement);
        Check_Incompleted();
      }
    });
  });
});

//when checked in todo , list fall down to completed
checkBox_in_to_do.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    console.log(e.target.checked);
    if (e.target.checked == true) {
      toComplete(e.target.nextElementSibling.innerHTML);
      todo.removeChild(e.target.parentElement);
      checkbox_in_completed = completed.querySelectorAll(
        "input[type=checkbox]"
      );
      Check_Incompleted();
    }
  });
});

window.addEventListener("click", (e) => {
  if (e.target.classList[0] == "edit") {
    let parent = e.target.parentElement;
    let value =
      e.target.previousElementSibling.previousElementSibling.innerHTML;
    e.target.previousElementSibling.value = value;
    e.target.previousElementSibling.addEventListener("change", (el) => {
      parent.classList.toggle("editMode");

      e.target.previousElementSibling.previousElementSibling.innerHTML =
        el.target.value;
    });
    parent.classList.toggle("editMode");
  }
  if (e.target.classList[0] == "delete") {
    console.log(e.target.parentElement.parentElement.id)
    if(e.target.parentElement.parentElement.id == 'incomplete-tasks'){
      console.log(e.target.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML)
      todolist_item.splice(todolist_item.indexOf(e.target.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML),1)
      localStorage.setItem('todo',JSON.stringify(todolist_item))
    }
    // if(e.target.parentElement.parentElement == )

    e.target.parentElement.parentElement.removeChild(e.target.parentElement);

  }
});

//pust complete localstorage list string to next item
todo.addEventListener('click',(e)=>{
  console.log(e.target.tagName)
 if( e.target.tagName=='INPUT'){
  if( e.target.getAttribute('type')=='checkbox'){
    if(e.target.checked == true){
      complete_item.push(e.target.nextElementSibling.innerHTML)
      let complete_item_list = JSON.stringify(complete_item)
      localStorage.setItem('complete',complete_item_list)
      todolist_item.splice(todolist_item.indexOf(e.target.nextElementSibling.innerHTML),1)
      localStorage.setItem('todo',JSON.stringify(todolist_item))
    }
  }
 }
})

console.log(todolist_item,complete_item)

completed.addEventListener('click',(e)=>{

  if(e.target.tagName == 'INPUT' && e.target.getAttribute('type')=='checkbox'){
    if(e.target.checked == false){
      console.log('run')

      todolist_item.push(e.target.nextElementSibling.innerHTML)
      console.log(todolist_item)
      localStorage.setItem('todo',JSON.stringify(todolist_item));
      complete_item.splice(complete_item.indexOf(e.target.innerHTML),1);
      console.log(complete_item)
      localStorage.setItem('complete',JSON.stringify(complete_item))
    }

  }
})
input_text.addEventListener("keypress", function(event) {
  // Check if the key pressed was the Enter key
  if (event.key === "Enter") {
    // Do something when the Enter key is pressed
    console.log("Enter key pressed");
    addBtn.click()
  }
});

