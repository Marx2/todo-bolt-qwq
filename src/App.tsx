import { useState, useEffect } from 'react';
    import { PlusCircleIcon } from 'lucide-react';
    import TodoItem from './components/TodoItem';

    interface Todo {
      id: string;
      text: string;
      completed: boolean;
    }

    function App() {
      const [todos, setTodos] = useState<Todo[]>([]);
      const [inputText, setInputText] = useState('');

      useEffect(() => {
        // Load from local storage
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
        }
      }, []);

      useEffect(() => {
        // Save to local storage whenever todos change
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);

      const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim()) {
          setTodos([
            ...todos,
            {
              id: crypto.randomUUID(),
              text: inputText,
              completed: false,
            },
          ]);
          setInputText('');
        }
      };

      const handleToggle = (id: string) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: !todo.completed }
              : todo
          )
        );
      };

      const handleDelete = (id: string) => {
        setTodos(todos.filter((todo) => todo.id !== id));
      };

      return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
          <div className="max-w-md mx-auto bg-white rounded shadow p-6 space-y-6">
            {/* Header */}
            <h1 className="text-3xl font-bold text-center mb-4">
              Todo List
            </h1>

            {/* Form to add new tasks */}
            <form onSubmit={addTodo} className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Add a new task..."
                className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition duration-150"
              >
                Add Task<PlusCircleIcon className="w-5 h-5 inline-block ml-1" />
              </button>
            </form>

            {/* Todo list */}
            <div className="space-y-3">
              {todos.length === 0 ? (
                <p className="text-center text-gray-600 italic">
                  No tasks yet. Start adding!
                </p>
              ) : (
                todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={() => handleToggle(todo.id)}
                    onDelete={() => handleDelete(todo.id)}
                  />
                ))
              )}
            </div>

            {/* Stats */}
            {todos.length > 0 && (
              <p className="text-right text-sm mt-4">
                {todos.filter((t) => !t.completed).length} tasks remaining
              </p>
            )}
          </div>
        </div>
      );
    }

    export default App;
