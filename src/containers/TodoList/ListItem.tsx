import React from 'react';
import './ListItem.css';
import {AppDispatch} from "../../app/store";
import {useDispatch} from "react-redux";
import {fetchTasks, removeTask, changeStatus} from "./todoListSlice";

interface Props {
  id: string;
  title: string;
  isDone: boolean;
}

const ListItem: React.FC<Props> = ({title, isDone,id}) => {
  const dispatch: AppDispatch = useDispatch();

  const onDelete = async () => {
    await dispatch(removeTask(id));
    await dispatch(fetchTasks());
  }

  const changeTaskStatus = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await dispatch(changeStatus({id, title, status: e.target.checked}));
    await dispatch(fetchTasks());
  }

  return (
    <div className="card">
      <input
        id="isDone"
        type="checkbox"
        checked={isDone}
        onChange={changeTaskStatus}
      /> <p className="task_item">{title}</p>
      <button onClick={() => onDelete()} className="remove_btn">Remove</button>
    </div>
  );
};

export default ListItem;