//Assign Dom
const input_text = document.querySelector("#new-task");
const addBtn = document.querySelector("#add");
const todo = document.querySelector("#incomplete-tasks");
const completed = document.querySelector("#completed-tasks");

//checkbox in to do
var checkBox_in_to_do = todo.querySelectorAll("input[type=checkbox]");
//checkbox in complete
var checkbox_in_completed = completed.querySelectorAll('input[type=checkbox]');

console.log(checkbox_in_completed)
//Define Varible
let input_text_Value = null;



//Define Function 

function input_text_Value_assign(){
   input_text_Value =  input_text.value;
}
function toIncomplete() {
  if (input_text_Value != null) {
    todo.innerHTML += `<li><input type="checkbox"><label>${input_text_Value}</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>`;
    input_text_Value = null
    input_text.value = ''
}
//add next slibling ele value to incomplete2

}
function toComplete(val){
    completed.innerHTML += `<li><input type="checkbox" checked><label>${val}</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>`
}
//check incompleted
function Check_completed(){
    checkbox_in_completed.forEach((ele)=>{
        ele.addEventListener('click',(e)=>{
            if(ele.checked == false){
                completed.removeChild(ele.parentElement)
            }
        })
    })
}
function Check_in_to_do(){
    //when checked in todo , list fall down to completed
checkBox_in_to_do.forEach((ele)=>{
    ele.addEventListener('click',(e)=>{
        if(e.target.checked == true){
            toComplete(e.target.nextElementSibling.innerHTML)
            todo.removeChild( e.target.parentElement)
            checkbox_in_completed = completed.querySelectorAll('input[type=checkbox]');
            Check_completed()
        }
    })
})
}
//function check

//Event Setup

//assign value  when input text change
input_text.addEventListener('keydown',input_text_Value_assign)

//add list to todolist tag when add button click
addBtn.addEventListener('click',()=>{
    toIncomplete();
    checkBox_in_to_do = todo.querySelectorAll("input[type=checkbox]");
    checkbox_in_completed = completed.querySelectorAll('input[type=checkbox]');

    Check_in_to_do()
})

Check_completed()
Check_in_to_do()

