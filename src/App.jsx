import "./App.css";
import flowerimg from "./img/Rectangle.png";
import trashsvg from "./svg/trash.svg";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      timestamp: new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      completed: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setInputValue("");
  };

const [currentTime, setCurrentTime] = useState(new Date());

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <>
      <section className="w-full h-screen flex md:flex-row bg-[#eeeeee] flex-col items-center justify-center">
        <div className="w-[50%]">
          <span className="text-[96px] text-[#007FDB] font-bold flex items-center justify-center">
            Todo
          </span>
        </div>
        <div className="w-[50% flex items-center justify-center] rounded-[18px] bg-white flex-col">
          <div className="rounded-[18px]"></div>
          <div className="relative">
            <img src={flowerimg} alt="" />
            <span className="text-white text-[18px] font-medium absolute bottom-[30%] right-[5%]">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
              })}
            </span>
            <span className="text-[48px] text-white font-medium absolute bottom-0 right-[5%]">
              {currentTime.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
          <div className="p-[23px_29px] flex flex-col gap-[23px]">
            <form
              onSubmit={handleAddTodo}
              className="flex gap-[10px] items-center justify-center"
            >
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Note"
                className="bg-[#EBEFF2] p-[14px] rounded-[5px]"
                type="text"
              />
              <button
                className="bg-[#20EEB0] text-white p-[8px_35px] text-[25px] rounded-[5px]"
                type="submit"
              >
                +
              </button>
            </form>
            {todos.map((todo) => (
              <div key={todo.id} className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span
                    className={`text-black text-[18px] ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                  <span className="text-[16px] text-[#888888]">
                    Today at {todo.timestamp}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-[15px]">
                  <button
                    onClick={() => handleToggleComplete(todo.id)}
                    className="border-[2px] border-[#20EEB0] text-white w-[24px] h-[24px] rounded-2xl flex items-center justify-center"
                    style={{
                      backgroundColor: todo.completed ? "#20EEB0" : "white",
                    }}
                  >
                    {todo.completed && "✓"}
                  </button>
                  <button onClick={() => handleDelete(todo.id)}>
                    <img src={trashsvg} alt="Delete" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
