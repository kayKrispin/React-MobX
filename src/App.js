import React from 'react';
import './App.css';
import { observer } from "mobx-react";

@observer class App extends React.Component {

  removeTodo = index => {
    this.props.store.removeTodo(index);
  };

  searchItem = value => {
    this.props.store.searchItem(value)
  };

  searchFilms = value => {
    this.props.store.searchFilmItem(value);
    this.props.store.getMovies();
  };

  render () {
    const { store } = this.props;

    return (
      <div className="App">
        <h1>hello there</h1>
        <p>Filtered: {store.filteredFilm}</p>
        <p>{store.todoLength}</p>
        <ul className="todo-container">
          {
            store.filteredValue.map((todo, index) => (
              <li key={index} onClick={() => this.removeTodo(index)}>{`${todo.name} ${todo.price}`}</li>
            ))
          }
        </ul>
        <p>Total price: {store.totalPrice}</p>
        <div className="btn-container">
          <input onChange={this.searchItem} placeholder="Search for items" type="text"/>
          <button onClick={store.clearTodos}>Cler todos</button>
          <input onChange={this.searchFilms} placeholder="Get films" />
        </div>
        {
          store.proccessing && <div>Loading...</div>
        }
        <div className="film-container">
          {
            store.movies && store.movies.map(movie => (
              <div>
                <h2>{movie.Title}</h2>
                <img src={movie.Poster} alt=""/>
              </div>
            ))
          }
        </div>

      </div>
    );
  }
}

export default App;
