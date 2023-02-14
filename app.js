//Assign Dom
const input_text = document.querySelector("#new-task");
const addBtn = document.querySelector("#add");
const todo = document.querySelector("#incomplete-tasks");
const completed = document.querySelector("#completed-tasks");

//checkbox in to do
var checkBox_in_to_do = todo.querySelectorAll("input[type=checkbox]");
//checkbox in complete
var checkbox_in_completed = completed.querySelectorAll('input[type=checkbox]');

//Define Varible
let input_text_Value = null;



//Define Function 

function input_text_Value_assign(){
   input_text_Value =  input_text.value;
   console.log(input_text_Value)
}
function toIncomplete() {
  if (input_text_Value != null) {
    todo.innerHTML += `<li><input type="checkbox"><label>${input_text_Value}</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>`;
    input_text_Value = null
    input_text.value = ''
}

}

//add next slibling ele value to incomplete2
function toIncomplete2(val){
    todo.innerHTML += `<li><input type="checkbox"><label>${val}</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>`;
}
//add next slibing ele value to complete
function toComplete(val){
    completed.innerHTML += `<li><input type="checkbox" checked><label>${val}</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>`
}

function Check_Incompleted(){
    checkbox_in_completed = completed.querySelectorAll('input[type=checkbox]');

    checkbox_in_completed.forEach((ele)=>{
        ele.addEventListener('click',(e)=>{
            console.log(ele.nextElementSibling.innerHTML)
            if(ele.checked == false){
                completed.removeChild(ele.parentElement)
                toIncomplete2(ele.nextElementSibling.innerHTML)
                
                    toIncomplete();
                    
                    checkBox_in_to_do = todo.querySelectorAll("input[type=checkbox]");
                    checkbox_in_completed = completed.querySelectorAll('input[type=checkbox]');
                
                    checkBox_in_to_do.forEach((ele)=>{
                        ele.addEventListener('click',(e)=>{
                            console.log(e.target.checked)
                            if(e.target.checked == true){
                                toComplete(e.target.nextElementSibling.innerHTML)
                                todo.removeChild( e.target.parentElement)
                                Check_Incompleted()
                                
                            }
                        })
                    })
                  
                
            }
        })
    })
}



//Event Setup

//assign value  when input text change
input_text.addEventListener('keydown',input_text_Value_assign)

//add list to todolist tag when add button click
addBtn.addEventListener('click',()=>{
    toIncomplete();
    
    checkBox_in_to_do = todo.querySelectorAll("input[type=checkbox]");
    checkbox_in_completed = completed.querySelectorAll('input[type=checkbox]');

    checkBox_in_to_do.forEach((ele)=>{
        ele.addEventListener('click',(e)=>{
            console.log(e.target.checked)
            if(e.target.checked == true){
                toComplete(e.target.nextElementSibling.innerHTML)
                todo.removeChild( e.target.parentElement)
                Check_Incompleted()
                
            }
        })
    })
  
})

//when checked in todo , list fall down to completed
checkBox_in_to_do.forEach((ele)=>{
    ele.addEventListener('click',(e)=>{
        console.log(e.target.checked)
        if(e.target.checked == true){
            toComplete(e.target.nextElementSibling.innerHTML)
            todo.removeChild( e.target.parentElement)
            checkbox_in_completed = completed.querySelectorAll('input[type=checkbox]');
            Check_Incompleted()
        }
    })
})

window.addEventListener('click',(e)=>{
    if(e.target.classList[0] == 'edit'){
        let parent = e.target.parentElement;
        let value = e.target.previousElementSibling.previousElementSibling.innerHTML
        e.target.previousElementSibling.value = value;
        e.target.previousElementSibling.addEventListener('change',(el)=>{
            parent.classList.toggle('editMode')

            e.target.previousElementSibling.previousElementSibling.innerHTML = el.target.value
        })
        parent.classList.toggle('editMode')

    }
    if(e.target.classList[0] == 'delete'){
        e.target.parentElement.parentElement.removeChild(e.target.parentElement)
    }
})

// const editBtn = document.querySelector('.edit')