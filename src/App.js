import React, { Component } from "react";
import TodoItem from "./components/TodoItem";
import Header from "./components/Header";

class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        content: "teste lalala lalal",
        done: false
      },
      {
        id: 2,
        content: "teste 2l",
        done: true
      },
      {
        id: 3,
        content: "lalala lalal",
        done: false
      },
      {
        id: 4,
        content: "oi bomdia",
        done: true
      },
      {
        id: 5,
        content: "Fazer café",
        done: false
      }
    ]
  };
  render() {
    return (
      <div className="content">
        <Header />
        <ul className="todo-list">
          {this.state.todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
        <div className="footer">
          <div>Total: {this.state.todos.length}</div>
          <div>
            tinalizados:{" "}
            {this.state.todos.filter(todo => todo.done === true).length}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
