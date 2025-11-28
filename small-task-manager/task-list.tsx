import React, { useState, useCallback } from 'react';
import { TaskItem } from './task-item';
import { AddTaskForm } from './add-task-form';
import { useLocalStorage } from './use-local-storage';

export type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTask = useCallback((text: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, [setTasks]);

  const toggleTask = useCallback((id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, [setTasks]);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeCount = tasks.filter(t => !t.completed).length;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Task Manager</h1>

      <AddTaskForm onAddTask={addTask} />

      <div style={{ margin: '20px 0' }}>
        <button
          onClick={() => setFilter('all')}
          style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
        >
          All ({tasks.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          style={{ fontWeight: filter === 'active' ? 'bold' : 'normal', marginLeft: '10px' }}
        >
          Active ({activeCount})
        </button>
        <button
          onClick={() => setFilter('completed')}
          style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal', marginLeft: '10px' }}
        >
          Completed ({tasks.length - activeCount})
        </button>
      </div>

      <div>
        {filteredTasks.length === 0 ? (
          <p>No tasks to show</p>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};
