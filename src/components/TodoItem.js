import React, { Component } from "react";

export default class TodoItem extends Component {
  state = {
    done: false
  };

  componentDidMount() {
    const { done } = this.props.todo;
    this.setState({ done });
  }

  handleCheckboxChange = () => {
    this.setState({ done: !this.state.done });
  };

  render() {
    const { id, content, done } = this.props.todo;
    return (
      <li className={done ? "todo-item done" : "todo-item"}>
        <input
          type="checkbox"
          id={id}
          onChange={this.handleCheckboxChange}
          checked={this.state.done}
        />
        <label htmlFor={id}>{content}</label>
      </li>
    );
  }
}
