class components {
  static tasknode(taskContent) {
    let li = document.createElement("li");
    li.classList.add("list-group-item", "task-parent");
    let div = document.createElement("div");
    div.classList.add("input-group", "mb-3");
    let p = document.createElement("p");
    p.classList.add("form-control", "task-text");

    let button = document.createElement("button");
    button.classList.add("btn", "btn-info", "btn-done");
    button.id = "button-addon2";
    button.setAttribute("type", "button");
    button.appendChild(document.createTextNode("Done"));

    // add content
    p.appendChild(document.createTextNode(taskContent));

    div.appendChild(p);
    div.appendChild(button);
    li.appendChild(div);
    return li;
  }
  static addNewTodo(taskText) {
    document
      .querySelector(".list-group")
      .appendChild(components.tasknode(taskText));
  }
}
const KEY = "alltasks";
class utils {
  static getdata() {
    return (localStorage.getItem(KEY)) ? JSON.parse(localStorage.getItem(KEY)) : [];  
//     if () return ;
//     else {
//       return ;
//     }
  }
  static additem(item) {
    let updatedTasks = this.getdata();
    updatedTasks.push(item);
    localStorage.setItem(KEY, JSON.stringify(updatedTasks));
  }
  static redo() {
    localStorage.setItem(KEY, JSON.stringify(["make a cake", "buy new car"]));
    console.log(this.getdata());
  }
  static removeitem(item) {
    let updatedTasks = this.getdata().filter((_item) => {
      return !(_item === item);
    });
    localStorage.setItem(KEY, JSON.stringify(updatedTasks));
    // debugger;
  }
  static clearall() {
    localStorage.clear();
  }
}

let alltasks = utils.getdata();
if (alltasks) {
  alltasks.forEach((taskText) => {
    console.log(typeof taskText);
    components.addNewTodo(taskText);
  });
}

document.querySelector(".card").addEventListener("click", (e) => {
  if (e.target.classList.contains("add-task")) {
    const taskText = document.querySelector("#task-text");

    if (taskText.value === "") {
      alert("nope, not here buddy. Enter something...");
    } else {
      components.addNewTodo(taskText.value);
      // add task to the local storage
      utils.additem(taskText.value);
      taskText.value = "";
    }
  } else if (e.target.classList.contains("btn-done")) {
    e.target.parentElement.parentElement.remove();
    utils.removeitem(e.target.parentElement.childNodes[0].innerText);
  } else if (e.target.classList.contains("clear-list")) {
    document.querySelectorAll(".task-parent").forEach((item) => {
      item.remove();
    });
    // clearing all data
    utils.clearall();
  }
});

/**
 * what to do? - features added
 * apply local storage functionality [done]
 * apply import export for optimization
 */
