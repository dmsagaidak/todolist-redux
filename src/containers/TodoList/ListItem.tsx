import React, {useState} from 'react';
import './ListItem.css';
import {TaskItem} from "../../types";

interface Props {
  title: string;
  isDone: boolean;
}

const ListItem: React.FC<Props> = ({title, isDone}) => {
  const [task, setTask] = useState<TaskItem>({
    id: '',
    title: '',
    status: false,
  })

  return (
    <div className="card">
      <input
        id="isDone"
        type="checkbox"
        checked={isDone}
        onChange={(e) => {
          setTask(prev =>({...prev, status: e.target.checked}))
        }}
      /> <span>{title}</span>
    </div>
  );
};

export default ListItem;