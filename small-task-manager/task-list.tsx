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
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

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

  const sortedTasks = sortDirection
    ? tasks.sort(tasksSortFn(sortDirection))
    : tasks;

  const filteredTasks = sortedTasks.filter(filterTasksFn(filter));

  const activeCount = tasks.filter(t => !t.completed).length;

  const handleSortToggle = () => {
    if (sortDirection === null) {
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortDirection(null);
    }
  };

  const getSortButtonText = () => {
    if (sortDirection === 'asc') return 'Sort ↑';
    if (sortDirection === 'desc') return 'Sort ↓';
    return 'Sort';
  };

  const renderTasks = (tasksToRender: Task[]) => (
    tasksToRender.map((task, index) => (
      <TaskItem
        key={index}
        task={task}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    ))
  );

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Task Manager</h1>

      <AddTaskForm onAddTask={addTask} />

      <div style={{ margin: '20px 0', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={() => setFilter('all')}
          style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
        >
          All ({tasks.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          style={{ fontWeight: filter === 'active' ? 'bold' : 'normal' }}
        >
          Active ({activeCount})
        </button>
        <button
          onClick={() => setFilter('completed')}
          style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal' }}
        >
          Completed ({tasks.length - activeCount})
        </button>
        <div style={{ marginLeft: 'auto' }}>
          <button
            onClick={handleSortToggle}
            style={{
              padding: '5px 15px',
              background: sortDirection ? '#2196F3' : '#ddd',
              color: sortDirection ? 'white' : '#666',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: sortDirection ? 'bold' : 'normal',
            }}
          >
            {getSortButtonText()}
          </button>
        </div>
      </div>

      <div>
        {filteredTasks.length === 0 ? (
          <p>No tasks to show</p>
        ) : (
          renderTasks(filteredTasks)
        )}
      </div>
    </div>
  );
};

const filterTasksFn = (filter: 'all' | 'active' | 'completed') => (task: Task) => {
  if (filter === 'active') return task.completed;
  if (filter === 'completed') return task.completed;
  return true;
};

const tasksSortFn = (direction: 'asc' | 'desc' | null) => (a: Task, b: Task) => {
  const aText = a.text.toLowerCase();
  const bText = b.text.toLowerCase();

  if (direction === 'asc') {
    return aText > bText ? 1 : -1;
  } else if (direction === 'desc') {
    return bText > aText ? 1 : -1;
  }
  return 0;
};
