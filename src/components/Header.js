import React from "react";

const Header = props => (
  <div className="header">
    <form onSubmit={props.handleAddTodo} method="post" id="form">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={props.newTodo}
        onChange={props.handleInputChange}
        onKeyDown={e => e.keyCode !== 13}
      />
    </form>
  </div>
);

export default Header;
