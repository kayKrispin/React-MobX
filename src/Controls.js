import React from 'react';

class Controls extends React.Component {

  addTodo = () => {
    const todo = prompt("wot is love?");
    const price = prompt("how much?");
    this.props.store.addTodo({ name: todo, price: parseInt(price) })
  };

  render() {

    return (
      <div className="btn-container">
        <button onClick={this.addTodo}>
          add todo
        </button>
      </div>
    )
  }
}

export default Controls;
