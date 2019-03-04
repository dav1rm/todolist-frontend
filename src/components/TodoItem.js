import React, { Component } from "react";

export default class TodoItem extends Component {
  state = {
    edit: false,
    content: ""
  };

  handleEdit = async e => {
    e.preventDefault();
    const { todo, handleUpdateTodo } = this.props;
    const { content } = this.state;

    await handleUpdateTodo(todo, { content });

    this.setState({ edit: false, content: "" });
  };

  handleInputChange = e => {
    this.setState({ content: e.target.value });
  };

  render() {
    const { todo, handleUpdateTodo, handleDeleteTodo } = this.props;
    const { edit } = this.state;
    return (
      <li className={todo.done ? "todo-item done" : "todo-item"}>
        {edit ? (
          <form onSubmit={this.handleEdit} method="post">
            <input
              type="text"
              onChange={this.handleInputChange}
              value={this.state.content}
            />
            <button type="submit">Save</button>
          </form>
        ) : (
          <label
            onDoubleClick={() =>
              this.setState({ edit: true, content: todo.content })
            }
          >
            {todo.content}
          </label>
        )}

        <button
          type="submit"
          onClick={() => handleUpdateTodo(todo, { done: !todo.done })}
        >
          {todo.done ? "Undone" : "Done"}
        </button>
        <button type="submit" onClick={() => handleDeleteTodo(todo)}>
          Delete
        </button>
      </li>
    );
  }
}
