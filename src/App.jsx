import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Купить продукты', priority: 'high', isDone: false },
    { id: 2, title: 'Сделать ДЗ', priority: 'normal', isDone: false },
    { id: 3, title: 'Позвонить маме', priority: 'low', isDone: true },
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('normal');
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);
  const [nextId, setNextId] = useState(4);

  const addTask = () => {
    if (!newTitle.trim()) return;
    const newTask = { id: nextId, title: newTitle, priority: newPriority, isDone: false };
    setTasks([...tasks, newTask]);
    setNextId(nextId + 1);
    setNewTitle('');
    setNewPriority('normal');
  };

  const completeTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isDone: true } : task));
  };

  const filteredTasks = showOnlyIncomplete ? tasks.filter(task => !task.isDone) : tasks;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>📋 Список дел</h1>
      <div>
        <input type="text" placeholder="Название задачи" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
        <select value={newPriority} onChange={e => setNewPriority(e.target.value)}>
          <option value="low">Низкий</option>
          <option value="normal">Средний</option>
          <option value="high">Высокий</option>
        </select>
        <button onClick={addTask}>➕ Добавить</button>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={showOnlyIncomplete} onChange={e => setShowOnlyIncomplete(e.target.checked)} />
          Показать только невыполненные
        </label>
      </div>
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} style={{ textDecoration: task.isDone ? 'line-through' : 'none' }}>
            <strong>{task.title}</strong> ({task.priority})
            {!task.isDone && <button onClick={() => completeTask(task.id)} style={{ marginLeft: '10px' }}>✅ Выполнено</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;