import React from 'react';
import { Task } from './task-list';

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TaskItem: React.FC<TaskItemProps> = React.memo(({ task, onToggle, onDelete }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        border: '1px solid #ddd',
        marginBottom: '8px',
        borderRadius: '4px',
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
        style={{ marginRight: '10px' }}
      />
      <span
        style={{
          flex: 1,
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? '#888' : '#000',
        }}
      >
        {task.text}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        aria-label={`Delete task "${task.text}"`}
        style={{
          padding: '4px 8px',
          background: '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Delete
      </button>
    </div>
  );
});

TaskItem.displayName = 'TaskItem';
