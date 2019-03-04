import React from "react";

const Footer = ({ todos }) => (
  <div className="footer">
    <div>Total: {todos.length}</div>
    <div>Finalizados: {todos.filter(todo => todo.done === true).length}</div>
  </div>
);

export default Footer;
