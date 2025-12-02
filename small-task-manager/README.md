# Task Manager

A simple and efficient task management application built with React and TypeScript. Keep track of your tasks, mark them as complete, and organize them with filtering and sorting capabilities.

## Features

- **Add Tasks**: Quickly add new tasks with a simple input form
- **Mark Complete**: Toggle tasks between active and completed states
- **Filter Tasks**: View all tasks, only active tasks, or only completed tasks
- **Sort Tasks**: Alphabetically sort your tasks in ascending or descending order
- **Persistent Storage**: Tasks are automatically saved to localStorage and persist between sessions
- **Keyboard Shortcuts**: Press Escape to clear the input field
- **Task Counter**: See how many tasks you've added in the current session

## Usage

### Adding Tasks

1. Type your task in the input field
2. Press Enter or click the "Add Task" button
3. Your task will appear in the list below

### Managing Tasks

- **Complete a task**: Click the checkbox next to a task to mark it as complete
- **Delete a task**: Click the "Delete" button to remove a task
- **Filter tasks**: Use the "All", "Active", or "Completed" buttons to filter your view
- **Sort tasks**: Click the "Sort" button to toggle between ascending, descending, and unsorted views

### Keyboard Shortcuts

- **Escape**: Clear the input field (useful for quickly starting over)

## Technical Details

### Built With

- React 18
- TypeScript
- Local Storage API for persistence

### Components

- **TaskList**: Main container component managing state and task operations
- **TaskItem**: Individual task display with checkbox and delete button
- **AddTaskForm**: Input form for creating new tasks
- **useLocalStorage**: Custom hook for localStorage persistence

### Data Persistence

All tasks are automatically saved to your browser's localStorage. Your tasks will be available even after closing and reopening the browser, as long as you're using the same browser on the same device.

## Development

This is a TypeScript React application. The components follow React best practices with proper state management, memoization, and effect cleanup.

### File Structure

```
├── task-list.tsx          # Main component with task management logic
├── task-item.tsx          # Individual task display component
├── add-task-form.tsx      # Form for adding new tasks
└── use-local-storage.ts   # Custom hook for localStorage integration
```

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript
- localStorage API
- React 18

## Notes

- Tasks are stored per-browser, not synced across devices
- Maximum storage is limited by browser localStorage limits (typically ~5-10MB)
- Task IDs are generated using timestamps for uniqueness
