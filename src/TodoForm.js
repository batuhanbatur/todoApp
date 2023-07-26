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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
  TOGGLE_EDIT_TODO: "edit-todo",
  SAVE_EDIT_TODO: "save-edit-todo",
  CANCEL_EDIT: "cancel-edit",
}; // Global Actions

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
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
          return { ...todo, isEditing: !todo.isEditing };
        }
        return todo;
      });
    case ACTIONS.SAVE_EDIT_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            name: action.payload.editedName,
            isEditing: !todo.isEditing,
          };
        }
        return todo;
      });

    case ACTIONS.CANCEL_EDIT:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, name: todo.name, isEditing: !todo.isEditing };
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
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
  const [duplicatedName, setDuplicatedName] = useState("");
  const [alertStatus, setAlertStatus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundDuplicate = todos.some((todo) => todo.name === name);
    if (foundDuplicate) {
      setDuplicatedName(name);
      setShowDuplicateAlert(true);
    } else if (name.length === 0) {
      setAlertStatus(true);
    } else {
      dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
      setAlertStatus(false);
    }
    setName("");
  };

  const handleAddDuplicate = () => {
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: duplicatedName } });
    setShowDuplicateAlert(false);
    setName("");
    setDuplicatedName("");
    setAlertStatus(false);
  };

  console.log(todos);

  return (
    <>
      {alertStatus && (
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>Please add a todo.</AlertTitle>
        </Alert>
      )}

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
          {showDuplicateAlert && (
            <AlertDialog
              isOpen={true}
              onClose={() => setShowDuplicateAlert(false)}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    You already have this todo in your list.
                  </AlertDialogHeader>
                  <AlertDialogBody>Want to add anyway?</AlertDialogBody>
                  <AlertDialogFooter>
                    <Button
                      colorScheme="red"
                      onClick={handleAddDuplicate}
                      payload={name}
                      ml={3}
                    >
                      Add
                    </Button>
                    <Button onClick={() => setShowDuplicateAlert(false)}>
                      Cancel
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          )}
        </div>
      </div>
    </>
  );
}

export default TodoForm;
