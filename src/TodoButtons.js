import React from "react";
import { ACTIONS } from "./TodoForm";
import { Button } from "@chakra-ui/react";
import { useState, useReducer } from "react";
import { Input } from "@chakra-ui/react";
import {
  DeleteIcon,
  UnlockIcon,
  WarningIcon,
  NotAllowedIcon,
  CheckIcon,
} from "@chakra-ui/icons";

export default function TodoButtons({ todo, dispatch }) {
  const [editedName, setEditedName] = useState(todo.name);

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch({
      type: ACTIONS.SAVE_EDIT_TODO,
      payload: { id: todo.id, editedName: editedName },
    });
  };

  return (
    <div>
      {!todo.isEditing ? (
        <div>
          <span
            style={{
              color: todo.complete ? "#AAA" : "#000",
              textDecoration: todo.complete ? "line-through" : "none",
            }}
          >
            {todo.name}
          </span>
          <Button
            size="xs"
            colorScheme="blue"
            onClick={() =>
              dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })
            }
          >
            <CheckIcon />
          </Button>
          <Button
            size="xs"
            colorScheme="blue"
            onClick={() =>
              dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
            }
          >
            <DeleteIcon />
          </Button>
          <Button
            size="xs"
            colorScheme="blue"
            onClick={() =>
              dispatch({
                type: ACTIONS.TOGGLE_EDIT_TODO,
                payload: { id: todo.id },
              })
            }
          >
            <UnlockIcon />
          </Button>
        </div>
      ) : todo.name === editedName || editedName.length == 0 ? (
        <div>
          <form onSubmit={handleEdit}>
            <Input
              htmlSize={2}
              width="150px"
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />

            <Button
              size="xs"
              colorScheme="blue"
              onClick={() =>
                dispatch({
                  type: ACTIONS.CANCEL_EDIT,
                  payload: { id: todo.id },
                })
              }
            >
              Cancel
            </Button>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={handleEdit}>
            <Input
              htmlSize={2}
              width="150px"
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />

            <Button size="xs" colorScheme="blue" onClick={handleEdit}>
              Save
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
