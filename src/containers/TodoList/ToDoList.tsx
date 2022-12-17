import React, {useEffect} from 'react';
import {AppDispatch, RootState} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {fetchTasks} from "./todoListSlice";
import ListItem from "./ListItem";

const ToDoList = () => {
  const dispatch: AppDispatch = useDispatch();
  const todoListItems = useSelector((state: RootState) => state.todolist.tasks);
  const todoListLoading = useSelector((state: RootState) => state.todolist.loading);
  const todoListUpdateLoading = useSelector((state:RootState) => state.todolist.updateLoading);

  console.log(todoListItems)

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch])

  return (
    <div>
      <h3>My tasks</h3>
      {todoListItems.map((item) => (
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