import React, { Component } from "react";

export default class Header extends Component {
  state = {
    newTodo: ""
  };

  handleSubmint = e => {
    if (e.keyCode !== 13) return;

    this.setState({ newTodo: "" });
    e.preventDefault();
  };

  handleInputChange = e => {
    this.setState({ newTodo: e.target.value });
  };

  render() {
    return (
      <div className="header">
        <form id="form" action="/todos" method="post">
          <input
            type="text"
            name="content"
            placeholder="What needs to be done?"
            value={this.state.newTodo}
            onChange={this.handleInputChange}
            onKeyDown={this.handleSubmint}
          />
        </form>
      </div>
    );
  }
}
