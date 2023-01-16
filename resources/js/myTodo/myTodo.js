let user = JSON.parse(localStorage.getItem('user'));

let addUser= ev=>{
    if(ev.keyCode==13){
        let user={
            name : inp.value
        }
        // localStorage에 user의 이름을 저장(JSON형태로)
        localStorage.setItem('user',JSON.stringify(user));
        location.reload();
    }
}
let addTodo=ev=>{
    if(ev.keyCode==13){
        // console.dir('Todo 추가 '+inp.value)
        
        let todo = JSON.parse(localStorage.getItem('todo'));
        if(!todo){
            //todoList[0]=user , todoList[1]=todo
            let todo=[{'user' : user.name , 'todoList' : [inp.value]}]
            //key :todo ,value : todoList
            localStorage.setItem('todo',JSON.stringify(todo));
            inp.value ='';
            renderTodo(todo[0].todoList);
            return;
        }
        
        //filter => Array로 반환
        let todoUser = todo.filter(e=>{
            return e['user'] == user.name;
        })[0];

        //todoUser가 없다는 것은 todo에 user가 없는것
        if(!todoUser){
            let newUserTodo={'user':user.name,'todoList':[inp.value]};
            todo.push(newUserTodo);
            localStorage.setItem('todo',JSON.stringify(todo));
            inp.value ='';
            renderTodo(newUserTodo.todoList);
            return;
        }
        
        // todo가 새로이 toduUser가 덮어써지는 것이 이해가 안됨
        todoUser.todoList.push(inp.value);
        localStorage.setItem('todo',JSON.stringify(todo));
        inp.value ='';
        renderTodo(todoUser.todoList);
    }
}

let renderTodo=(todoList)=>{

    todolists.innerHTML = '';
    todoList.forEach((e,i) => {
        console.dir(e);
        let icon = createElement('i',{prop:{className:"fa-regular fa-circle-xmark"}})
        let todoText = createElement('div',{text:`${e}`});

        icon.addEventListener('click', ev => {
            todoList.splice(i,1);
            renderTodo(todoList);
        });

        todoText.prepend(icon);
        todolists.append(todoText);
    });
}


let setToday=()=>{
    $('#today').innerHTML='';
    let now = new Date();
    let year = now.getFullYear();
    let mon = now.getMonth()+1;
    let day = now.getDate();
    if(mon<10) mon="0"+mon;
    let today = year+"."+mon+"."+day;
    $('#today').innerHTML=today;
    // console.log(year+"년"+mon+"월"+day+"일");
}

if(!user){
    inp.addEventListener('keyup',addUser);
}
else{
    userName.innerHTML = user.name;
    inp.placeholder = '할 일을 작성하세요.';
    inp.addEventListener('keyup',addTodo);
}
// console.dir($('#userName'));
// console.dir(user.name);
setToday();
let todo = JSON.parse(localStorage.getItem('todo'));
let todoUser = todo.filter(e=>{
    return e['user'] == user.name;
})[0];
renderTodo(todoUser.todoList)


