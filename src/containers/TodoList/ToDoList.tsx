import React, {useEffect} from 'react';
import {AppDispatch, RootState} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {fetchTasks} from "./todoListSlice";
import ListItem from "./ListItem";
import {ClipLoader} from "react-spinners";
import AddForm from "../AddForm/AddForm";

const ToDoList = () => {
  const dispatch: AppDispatch = useDispatch();
  const todoListItems = useSelector((state: RootState) => state.todolist.tasks);
  const todoListLoading = useSelector((state: RootState) => state.todolist.loading);
  const todoListUpdateLoading = useSelector((state:RootState) => state.todolist.updateLoading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);


  return (
    <div>
      <AddForm/>
      <h4>My tasks</h4>
      {todoListLoading || todoListUpdateLoading ? <ClipLoader/> : todoListItems.map((item) => (
        <ListItem
        key={item.id}
        id={item.id}
        title={item.title}
        isDone={item.status}
        />
      ))}
    </div>
  );
};

export default ToDoList;