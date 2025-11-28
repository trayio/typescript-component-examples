import React, { useState, useRef, useEffect } from 'react';

type AddTaskFormProps = {
  onAddTask: (text: string) => void;
};

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState('');
  const [submissionCount, setSubmissionCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount only
    inputRef.current?.focus();
  }, []); // Empty array - only runs on mount

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();

    if (trimmedValue) {
      onAddTask(trimmedValue);
      setSubmissionCount(prev => prev + 1); // Use state for values that need to trigger re-renders
      setInputValue('');
      inputRef.current?.focus();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
          aria-label="New task input"
          style={{
            padding: '10px',
            width: '70%',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            fontSize: '16px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
            opacity: inputValue.trim() ? 1 : 0.6,
          }}
        >
          Add Task
        </button>
      </form>
      <small style={{ color: '#666', fontSize: '12px' }}>
        Tasks added this session: {submissionCount}
      </small>
    </div>
  );
};
