import React, {useEffect} from 'react';
import {AppDispatch, RootState} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {fetchTasks} from "./TodoListSlice";

const ToDoList = () => {
  const dispatch: AppDispatch = useDispatch();
  const todoListTitle = useSelector((state: RootState) => state.todolist.title);
  const todoListStatus = useSelector((state: RootState) => state.todolist.status);
  const todoListLoading = useSelector((state: RootState) => state.todolist.loading);
  const todoListUpdateLoading = useSelector((state:RootState) => state.todolist.updateLoading)

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch])

  return (
    <div>
      
    </div>
  );
};

export default ToDoList;