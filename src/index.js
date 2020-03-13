import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { observable, configure, action, computed, decorate, when, autorun } from "mobx";
import Controls from "./Controls";

configure({ enforceActions: "observed" });


class TodoList {
   todos = [
      { name: "go", price: 50 },
      { name: "plz", price: 20 },
      { name: "brat", price: 2 }
    ];

   movies = [];

   filtered = "";
   filteredFilm = "";
   proccessing = false;

   addTodo(todo) {
    this.todos.push(todo);
  }

   removeTodo(index) {
    this.todos = this.todos.filter((todo,ind) => ind !== index);
  }

  get filteredValue () {
     const matchFilter = new RegExp(this.filtered);
    return this.todos.filter(({ name }) => matchFilter.test(name));
  };

  searchItem(value) {
    this.filtered = value.target.value;
  }

  searchFilmItem(value) {
    this.filteredFilm = value.target.value;
  }

   get totalPrice () {
    return this.todos.reduce((sum, { price }) => sum += price, 0)
  }

   get todoLength () {
    return this.todos.length
  }

  clearTodos = () => {
    this.todos = [];
  };

   getMovies = async () => {

     try {
       this.setProcessing(true);
       const response = await fetch(`http://www.omdbapi.com/?s=${this.filteredFilm}&apikey=ff7f2c54`);
       const data = await response.json();

       data.Search && this.setFilms(data.Search)

     } catch (e) {

       throw Error(e)

     } finally {
       this.setProcessing(false)
     }
  };

  setProcessing(condition) {
     this.proccessing = condition;
  }

  setFilms(films){
     this.movies = films
  }

};

decorate(TodoList, {
  todos: observable,
  filtered: observable,
  filteredFilm: observable,
  addTodo: action,
  removeTodo: action,
  totalPrice: computed,
  todoLength: computed,
  searchItem: action,
  clearTodos: action,
  movies: observable,
  getMovies: action,
  searchFilmItem: action,
  proccessing: observable,
  setProcessing: action,
  setFilms: action,
});

const todoStore = new TodoList();

when(
  () => todoStore.todos.length > 5,
  () => { alert('Todos value is more than 5') }
);

autorun(() => {
  alert(`Count value is: ${todoStore.todos.length}`);
}, {
  name: 'Custom autorun',
  delay: 3000,
});


const userName =  observable({

  name: "Evgen",
  age: "30",

  get nickName () {
      return `${this.name} ${this.age}`;
    },

  increment () { this.age++ },

  decrement() {

  if (this.age === 0) return;

  --this.age;
}

}, {
  increment: action,
  decrement: action
});


ReactDOM.render(
  <>
    <App store={todoStore} />
    <Controls store={todoStore} />
  </>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
