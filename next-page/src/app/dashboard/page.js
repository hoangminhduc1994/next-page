"use client";
import React, { useState } from "react";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editing, setEditing] = useState({ isEditing: false, editId: null });

  
  const handleSaveTodo = () => {
    if (!inputValue.trim()) {
      alert(`Vui lòng nhập công việc!`);
      return;
    }

    if (editing.isEditing) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editing.editId ? { ...todo, text: inputValue } : todo
        )
      );
    } else {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), text: inputValue, completed: false },
      ]);
    }

    setInputValue("");
    setEditing({ isEditing: false, editId: null });
  };

  // Xóa công việc
  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Chỉnh sửa công việc
  const handleEditTodo = (id, text) => {
    setInputValue(text);
    setEditing({ isEditing: true, editId: id });
  };

  // Đánh dấu hoàn thành công việc
  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Todo List
        </h1>

        {/* Input công việc */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nhập công việc..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={handleSaveTodo}
            className={`bg-${
              editing.isEditing ? "yellow" : "blue"
            }-500 text-white rounded-lg px-4 py-2 hover:bg-${
              editing.isEditing ? "yellow" : "blue"
            }-600 transition`}
          >
            {editing.isEditing ? "Cập nhật" : "Thêm"}
          </button>
        </div>

        {/* Danh sách công việc */}
        <ul className="space-y-2">
          {todos.length > 0 ? (
            todos.map(({ id, text, completed }) => (
              <li
                key={id}
                className={`flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg shadow-sm ${
                  completed ? "line-through text-gray-500" : ""
                }`}
              >
                <span
                  className="flex-grow cursor-pointer"
                  onClick={() => handleToggleComplete(id)}
                >
                  {text}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditTodo(id, text)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Xóa
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">
              Không có công việc nào!
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
