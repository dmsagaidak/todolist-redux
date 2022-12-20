import React, {useState} from 'react';
import "./AddForm.css"
import {AppDispatch} from "../../app/store";
import {useDispatch} from "react-redux";
import {addTask, fetchTasks} from "../TodoList/todoListSlice";
import {TaskItem} from "../../types";

const AddForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [task, setTask] = useState<TaskItem>({
    id: '',
    title: '',
    status: false,
  })

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(prev => ({...prev, title: e.target.value, status: false, id: (Math.random()*10000).toString()}))
  }

  const onTaskAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addTask(task));
    await dispatch(fetchTasks());
    setTask(prev =>({...prev, title: ''}));
  }

  return (
    <form onSubmit={onTaskAdd}>
      <label htmlFor="name">Add new task</label>
      <input id="name"
             name="name"
             type="text"
             className="add_form"
             value={task.title}
             onChange={onFormChange}
             />
      <button type="submit" className="submit_btn">Add</button>
    </form>
  );
};

export default AddForm;