import { useState } from "react";
import "./index.css";

const initialList = [
  { id: 1, task: "Study children prop" },
  { id: 2, task: "Change bedsheet" },
];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddTask(item) {
    setItems(function (items) {
      return [...items, item];
    });
  }

  function handleDeleteItem(id) {
    setItems(function (items) {
      return items.filter(function (item) {
        return item.id !== id;
      });
    });
  }

  function handleToggleItem(id) {
    setItems(function (items) {
      return items.map(function (item) {
        return item.id === id ? { ...item, complete: !item.complete } : item;
      });
    });
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all tasks?",
    );

    if (confirmed) setItems([]);
  }

  return (
    <main className="main">
      <Header />
      <FormAddTask onAddTask={handleAddTask} />
      <List
        items={items}
        onDeleteTask={handleDeleteItem}
        onToggleTask={handleToggleItem}
        onClearList={handleClearList}
      />
    </main>
  );
}

function Header() {
  // const date = new Date();

  // const [currentDate, setCurrentDate] = useState(date);

  return (
    <div className="header">
      <h3 className="title">What's on your to do list today?</h3>
      {/* <p className="date">Date : {currentDate}</p> */}
    </div>
  );
}

function FormAddTask({ onAddTask }) {
  const [task, setTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!task) return;

    const newTask = { task, complete: false, id: Date.now() };
    console.log(newTask);

    onAddTask(newTask);

    setTask("");
  }

  return (
    <form className="form-add-task" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="write your task here ..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="button">Add</button>
    </form>
  );
}

function List({ items, onDeleteTask, onToggleTask, onClearList }) {
  return (
    <div className="list">
      <ul>
        {items.map(function (item, i) {
          return (
            <Item
              item={item}
              index={i}
              key={item.id}
              onDeleteTask={onDeleteTask}
              onToggleTask={onToggleTask}
            />
          );
        })}
      </ul>
      <button className="button" onClick={onClearList}>
        Clear List
      </button>
    </div>
  );
}

function Item({ item, index, onDeleteTask, onToggleTask }) {
  return (
    <li>
      <input
        className="checkbox"
        type="checkbox"
        value={item.complete}
        onChange={() => {
          onToggleTask(item.id);
        }}
      />
      <p>{index + 1}.</p>
      <p style={item.complete ? { textDecoration: "line-through" } : {}}>
        {item.task}{" "}
      </p>
      <button className="delete-btn" onClick={() => onDeleteTask(item.id)}>
        {" "}
        ❌{" "}
      </button>
    </li>
  );
}
