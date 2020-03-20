import React, {useState} from "react";

function Todo() {

  let [list, setList]  = useState([{ todo: "hello" }, { todo: "bue" }]);

  const addTodo = () => {
    const todo = document.getElementById("xm");
     setList([...list, {todo: todo.value}]);
    todo.value = "";
  };


  const removeTodo = index => {
    const newlist = list.filter((el, ind) => ind !== index);

    setList(newlist)
  };

  return (
    <div>
      <input id="xm" type="text"/>
      <button onClick={addTodo}>add todo</button>
      {
        list.map((item, index) => <p onClick={() => removeTodo(index)}>{item.todo}</p> )
      }
    </div>
  )
}

export default Todo;
