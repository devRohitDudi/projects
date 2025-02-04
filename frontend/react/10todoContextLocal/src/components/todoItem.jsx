import React from "react";
import { useTodo } from "../contexts";
import { useState } from "react";

import PropTypes from "prop-types";


export function TodoItem({ todo }) {

    const { editTodo, removeTodo, toggleComplete } = useTodo()
    const [isEditable, setIsEditable] = useState(false)
    const [todoText, setTodoText] = useState(todo.todo)

    const updateTodo = () => {
        editTodo(todo.id, { ...todo, todo: todoText })
        setIsEditable(false)
    }

    const toggleCompleted = () => {
        toggleComplete(todo.id)
    }


    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
                }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${isEditable ? "border-black/10 px-2" : "border-transparent"
                    } ${todo.completed ? "line-through" : ""}`}
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                readOnly={!isEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isEditable) {
                        updateTodo();
                    } else setIsEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => removeTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

// Define prop types for TodoItem
TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        todo: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired
};
