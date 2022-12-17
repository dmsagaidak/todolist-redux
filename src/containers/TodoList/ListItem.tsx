import React from 'react';
import './ListItem.css'

interface Props {
  title: string;
  isDone: boolean;
}

const ListItem: React.FC<Props> = ({title, isDone}) => {
  return (
    <div className="card">
      <p>{title}</p>
    </div>
  );
};

export default ListItem;