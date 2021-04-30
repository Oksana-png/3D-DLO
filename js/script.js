"use strict";

class Todo {
  constructor(form, input, todoList, todoCompleted, container) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.container = document.querySelector(container);
    this.todoData = new Map(JSON.parse(localStorage.getItem("todoList")));
  }

  handler(event) {
    const target = event.target;
    if (target.classList.contains("todo-complete")) {
      const k = target.closest(".todo-item").key;
      this.completedItem(k);
    } else if (target.classList.contains("todo-remove")) {
      const k = target.closest(".todo-item").key;
      this.deleteItem(k);
    } else if (target.classList.contains("todo-edit")) {
      const k = target.closest(".todo-item").key;
      this.editTodo(k);
    }
  }
  animation(key) {
    let i = 1;
    const li = document.querySelectorAll(".todo-item");
    li.forEach((elemLi) => {
      if (elemLi.key === key) {
        elemLi.style.backgroundColor = "#71A9F7";
        elemLi.style.Color = "#fff";
        const anim = setInterval(() => {
          if (i < 0) {
            i = 0;
            clearInterval(anim);
          }
          i -= 0.1;
          elemLi.style.opacity = i;
        }, 100);
      }
    });
  }

  deleteItem(key) {
    this.todoData.forEach((item) => {
      if (item.key === key) {
        this.animation(key);
        setTimeout(() => {
          this.todoData.delete(key);
          this.render();
        }, 1000);
      }
    });
  }
  completedItem(key) {
    this.todoData.forEach((item) => {
      if (item.key === key) {
        console.log(item);
        this.animation(key);
        setTimeout(() => {
          item.completed = !item.completed;
          this.render();
        }, 1000);
      }
    });
  }
  editTodo(key) {
    const li = document.querySelectorAll(".todo-item");
    li.forEach((elemLi) => {
      if (elemLi.key === key) {
        let complet = "";
        this.todoData.forEach((item) => {
          if (item.key === key) {
            complet = item.completed;
          }
        });
        if (elemLi.contentEditable && elemLi.contentEditable !== "inherit") {
          elemLi.contentEditable = false;
          const updateTodo = {
            value: elemLi.textContent,
            completed: complet,
            key: elemLi.key,
          };
          this.todoData.set(updateTodo.key, updateTodo);
          this.render();
        } else {
          elemLi.contentEditable = true;
        }
      }
    });
  }

  addToStorage() {
    localStorage.setItem("todoList", JSON.stringify([...this.todoData]));
  }
  render() {
    this.todoList.textContent = "";
    this.todoCompleted.textContent = "";
    this.todoData.forEach(this.createItem.bind(this));
    this.addToStorage();
  }
  createItem(item) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.key = item.key;
    li.insertAdjacentHTML(
      "beforeEnd",
      `
      <span class="text-todo">${item.value}</span>
      <div class="todo-buttons">
        <button class="todo-edit"></button>
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
      `
    );

    if (item.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addTodo(e) {
    if (this.input.value.trim()) {
      e.preventDefault();
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.input.value = "";
      this.todoData.set(newTodo.key, newTodo);
      this.render();
    } else {
      alert("Нельзя вводить пустое дело! Повторите еще раз");
      e.preventDefault();
    }
  }
  generateKey() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  init() {
    this.form.addEventListener("submit", this.addTodo.bind(this));
    document.addEventListener("click", this.handler.bind(this));
    this.render();
  }
}

const toDo = new Todo(
  ".todo-control",
  ".header-input",
  ".todo-list",
  ".todo-completed",
  ".todo-item",
  ".todo-container"
);

toDo.init();
