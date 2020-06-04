import { Component, OnInit } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { NgForm } from '@angular/forms';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  constructor(private service: TodosService) { }

  ngOnInit(): void {
    this.getAllItems();
  }
  getAllItems() {
    this.service.getAllItems().subscribe(response => {
      this.todos = response;
      console.log(this.todos);
    });
  }

  addItem(form: NgForm): void {
    let todo = form.value;
    todo.completed = false;
    this.service.addItem(todo).subscribe(() => {
      this.getAllItems();
      form.reset();
    })
  }
  delete(index: number): void {
    this.todos.splice(index, 1);
  }
  complete(index: number): void {
    this.todos[index].completed = true;
  }
  addTodo(form: NgForm) {
    this.todos.push({ task: form.value.todo, completed: false });
    form.reset();
  }
}
