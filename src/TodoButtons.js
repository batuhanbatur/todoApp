import React from "react";
import { ACTIONS } from "./TodoForm";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

function TodoButtons({ todo, dispatch }) {
  const [edit, setEdit] = useState(false);
  const [editedName, setEditedName] = useState("");

  const handleEdit = () => {
    setEdit(true);
    setEditedName(todo.name);
  };

  const handleSave = () => {
    dispatch({
      type: ACTIONS.EDIT_TODO,
      payload: { id: todo.id, name: editedName },
    });
    setEdit(false);
  };

  return (
    <div>
      <span
        style={{
          color: todo.complete ? "#AAA" : "#000",
          textDecoration: todo.complete ? "line-through" : "none",
        }}
      >
        {edit ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          todo.name
        )}
      </span>
      <Button
        size="xs"
        colorScheme="blue"
        onClick={() =>
          dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })
        }
      >
        Toggle
      </Button>
      <Button
        size="xs"
        colorScheme="blue"
        onClick={() =>
          dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
        }
      >
        Delete
      </Button>
      {edit ? (
        <Button size="xs" colorScheme="blue" onClick={handleSave}>
          Save
        </Button>
      ) : (
        <Button size="xs" colorScheme="blue" onClick={handleEdit}>
          Edit
        </Button>
      )}
    </div>
  );
}

export default TodoButtons;
