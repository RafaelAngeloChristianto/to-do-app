import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ToDoAppScreen.css";
import Popup from "reactjs-popup";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase-config";

const ToDoApp = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const getTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "Tasks"));
      setTasks(querySnapshot.docs.map((doc) => doc.data().task));
    };
    getTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();

    if (task) {
      await setDoc(doc(db, "Tasks", task), {
        task: task,
      });
      setTasks(tasks.concat(task));
      setTask("");
      setPopupOpen(false);
    }
  };

  const startEditing = (taskToEdit) => {
    setEditingTask(taskToEdit);
    setNewTask(taskToEdit);
  };
  const handleUpdateTask = async () => {
    await deleteDoc(doc(db, "Tasks", editingTask));
    await setDoc(doc(db, "Tasks", newTask), { task: newTask });

    setTasks(tasks.map((t) => (t === editingTask ? newTask : t)));
    setEditingTask(null);
  };

  const deleteTask = async (deleted_task) => {
    await deleteDoc(doc(db, "Tasks", deleted_task));
    setTasks(tasks.filter((task) => task !== deleted_task));
  };

  return (
    <>
      <nav>
        <img
          className="logo_nav"
          src="../src/components/imgs/logo.png"
          alt="Logo"
        />
        <h1 className="name">Rafael's To Do App</h1>

        <Link to="/" className="link_logout">
          <h3 className="logout">👈Log Out</h3>
        </Link>
      </nav>

      <div className="task_container">
        <div className="tasks_list">
          {tasks.map((t, index) => (
            <div key={index} className="task_box">
              {editingTask === t ? (
                <>
                  <input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onBlur={handleUpdateTask}
                    autoFocus
                  />
                  <button
                    className="save_btn"
                    onClick={() => handleUpdateTask()}
                  >
                    Save
                  </button>
                </>
              ) : (
                <span>{t}</span>
              )}
              <div>
                <button className="edit_btn" onClick={() => startEditing(t)}>
                  Edit
                </button>
                <button className="del_btn" onClick={() => deleteTask(t)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer>
        <Popup
          trigger={
            <button className="add_task" onClick={() => setPopupOpen(true)}>
              Add New Task
            </button>
          }
          modal
          open={popupOpen}
          onClose={() => setPopupOpen(false)}
        >
          {(close) => (
            <div className="container_popup">
              <h1>Add New Task</h1>
              <input
                type="text"
                placeholder="Add New Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <button
                onClick={(e) => {
                  addTask(e);
                  close();
                }}
                className="add_task_btn"
              >
                Add Task
              </button>
            </div>
          )}
        </Popup>
      </footer>
    </>
  );
};

export default ToDoApp;
