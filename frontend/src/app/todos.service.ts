import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  apiURL: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }
  getAllItems(): any {
    return this.http.get(`${this.apiURL}/todo-items`);
  }
  addItem(item: Todo) {
    return this.http.post(`${this.apiURL}/todo-items`, item);
  }
  deleteItem(id: number): any {
    return this.http.delete(`${this.apiURL}/todo-items/${id}`);

  }
  updateItem(id: number, item: Todo): any {
    return this.http.put(`${this.apiURL}/todo-items/${id}`, item);
  }
}

