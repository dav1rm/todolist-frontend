import React, { Component } from "react";
import api from "../services/api";
import socket from "socket.io-client";

import TodoItem from "./TodoItem";
import Header from "./Header";
import Footer from "./Footer";

export default class TodoList extends Component {
  state = {
    newTodo: "",
    todos: []
  };

  async componentDidMount() {
    this.subscribeToEvents();

    const { data } = await api.get("/todos");

    this.setState({ todos: data });
  }

  subscribeToEvents = () => {
    const io = socket(process.env.REACT_APP_API_URL);

    io.on("todoUpdate", data => {
      this.setState({
        todos: this.state.todos.map(todo =>
          todo._id === data._id ? data : todo
        )
      });
    });
    io.on("todoAdd", data => {
      this.setState({
        todos: [data, ...this.state.todos]
      });
    });
    io.on("todoDelete", data => {
      this.setState({
        todos: this.state.todos.filter(todo => todo._id !== data._id)
      });
    });
  };

  handleAddTodo = async e => {
    e.preventDefault();
    const { newTodo, todos } = this.state;

    if (newTodo.trim().length === 0) {
      alert("Valor do campo inválido");
      return;
    }

    try {
      const { data } = await api.post("/todos", { content: newTodo });

      this.setState({
        newTodo: "",
        todos: [data, ...todos]
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleUpdateTodo = async (todo, campos = {}) => {
    const { todos } = this.state;

    try {
      const { data } = await api.put(`/todos/${todo._id}`, campos);

      this.setState({
        todos: todos.map(item => (item === todo ? data : item))
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleDeleteTodo = async todo => {
    const { todos } = this.state;
    try {
      await api.delete(`/todos/${todo._id}`);
      this.setState({ todos: todos.filter(item => item !== todo) });
    } catch (err) {
      console.log(err);
    }
  };

  handleInputChange = e => {
    this.setState({ newTodo: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <Header
          handleAddTodo={this.handleAddTodo}
          newTodo={this.state.newTodo}
          handleInputChange={this.handleInputChange}
        />
        <ul className="todo-list">
          {this.state.todos.map(todo => (
            <TodoItem
              key={todo._id}
              handleUpdateTodo={this.handleUpdateTodo}
              handleDeleteTodo={this.handleDeleteTodo}
              todo={todo}
            />
          ))}
        </ul>
        <Footer todos={this.state.todos} />
      </div>
    );
  }
}
