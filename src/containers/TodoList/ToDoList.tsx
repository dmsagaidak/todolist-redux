import React, {useEffect} from 'react';
import {AppDispatch, RootState} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {fetchTasks} from "./todoListSlice";
import ListItem from "./ListItem";
import {ClipLoader} from "react-spinners";

const ToDoList = () => {
  const dispatch: AppDispatch = useDispatch();
  const todoListItems = useSelector((state: RootState) => state.todolist.tasks);
  const todoListLoading = useSelector((state: RootState) => state.todolist.loading);
  const todoListUpdateLoading = useSelector((state:RootState) => state.todolist.updateLoading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch])

  return (
    <div>
      <h3>My tasks</h3>
      {todoListLoading ? <ClipLoader/> : todoListItems.map((item) => (
        <ListItem
        key={item.id}
        title={item.title}
        isDone={item.status}
        />
      ))}
    </div>
  );
};

export default ToDoList;