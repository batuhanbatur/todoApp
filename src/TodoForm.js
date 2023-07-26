import React, { useContext } from "react";
import { useState, useReducer, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import TodoButtons from "./TodoButtons";
import { Button } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react'


export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
  TOGGLE_EDIT_TODO: "edit-todo",
  SAVE_EDIT_TODO: 'save-edit-todo',
  BLOCK_NULL_TODO: 'block-null-todo'
};




function reducer(todos, action) {

  switch (action.type) {
    case ACTIONS.ADD_TODO:
      const foundDuplicate = todos.some(
        (todo) => todo.name === action.payload.name,
      );
      if (foundDuplicate) {
      } else if (action.payload.name.length === 0) {
      } else {
        return [...todos, newTodo(action.payload.name)];
      }


    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);
    default:
      return todos;
    case ACTIONS.TOGGLE_EDIT_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {...todo, isEditing: !todo.isEditing};
        }
        return todo;
      });
        case ACTIONS.SAVE_EDIT_TODO:
          return todos.map((todo) => {
            if (todo.id === action.payload.id) {
              return { ...todo, name: action.payload.editedName, isEditing: !todo.isEditing };
            }
            return todo;
          });



  }
}



function newTodo(name) {
  return {
    id: Date.now(),
    complete: false,
    name: name,
    duplicate: false,
    isEditing: false,
  };
}

function TodoForm() {
  const [name, setName] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  };


  console.log(todos)

  return (
    <>
      <div className="todo-container">
        Todo App
        <form onSubmit={handleSubmit}>
          <Input
            htmlSize={4}
            width="200px"
            className="todo-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
        <div className="todo-buttons">
          {todos.map((todo) => {
            return (
              <TodoButtons
                key={todo.id}
                todo={todo}
                dispatch={dispatch}
                newTodo={newTodo}
                name={name}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default TodoForm;