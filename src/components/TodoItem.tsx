import { Trash2Icon } from 'lucide-react';
    
    interface Props {
      todo: { id: string; text: string; completed: boolean };
      onToggle: () => void;
      onDelete: () => void;
    }
    
    export default function TodoItem({ todo, onToggle, onDelete }: Props) {
      return (
        <div className="flex items-center gap-2 py-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={onToggle}
            className="cursor-pointer"
          />
          <span
            className={`${
              todo.completed ? 'line-through opacity-50' : ''
            } text-lg`}
          >
            {todo.text}
          </span>
          <button onClick={onDelete}>
            <Trash2Icon className="w-4 h-4 cursor-pointer text-red-500" />
          </button>
        </div>
      );
    }
