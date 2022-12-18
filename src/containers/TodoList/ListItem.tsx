import React, {useState} from 'react';
import './ListItem.css';
import {TaskItem} from "../../types";
import {AppDispatch} from "../../app/store";
import {useDispatch} from "react-redux";
import {fetchTasks, removeTask} from "./todoListSlice";

interface Props {
  id: string;
  title: string;
  isDone: boolean;
}

const ListItem: React.FC<Props> = ({title, isDone,id}) => {
  const dispatch: AppDispatch = useDispatch();
  const [task, setTask] = useState<TaskItem>({
    id: '',
    title: '',
    status: false,
  });

  const onDelete = async () => {
    await dispatch(removeTask(id));
    await dispatch(fetchTasks());
  }


  return (
    <div className="card">
      <input
        id="isDone"
        type="checkbox"
        checked={isDone}
        onChange={async (e) => {
          setTask(prev =>({...prev, status: e.target.checked}));
        }}
      /> <p className="task_item">{title}</p>
      <button onClick={() => onDelete()} className="remove_btn">Remove</button>
    </div>
  );
};

export default ListItem;