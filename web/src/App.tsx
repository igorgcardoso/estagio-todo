import * as Dialog from '@radix-ui/react-dialog';
import { ListChecks, ListPlus } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import NewTaskModal from './components/NewTaskModal';
import Toast from './components/Toast';
import Todo, { IToDo } from './components/Todo';
import api from './services/api';
import './styles/globals.css';

export default function App() {
  const [todos, setTodos] = useState<IToDo[]>([]);

  const [newTodoOpen, setNewTodoOpen] = useState(false);

  const [toastStyle, setToastStyle] = useState<'success' | 'failure'>('success');

  const [deleteToastOpen, setDeleteToastOpen] = useState(false);
  const [deleteToastTitle, setDeleteToastTitle] = useState('');
  const [deleteToastDescription, setDeleteToastDescription] = useState('');

  const [editToastOpen, setEditToastOpen] = useState(false);
  const [editToastTitle, setEditToastTitle] = useState('');
  const [editToastDescription, setEditToastDescription] = useState('');

  const [createToastOpen, setCreateToastOpen] = useState(false);
  const [createToastTitle, setCreateToastTitle] = useState('');
  const [createToastDescription, setCreateToastDescription] = useState('');

  const loadTodos = useCallback(async () => {
    const response = await api.get('todos/');

    setTodos(response.data);
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  async function moveUpward(todo: IToDo) {
    const index = todo.order;
    const newTodoOrder = todos.map(t => {
      if (t.order === index - 1) {
        return {
          ...t,
          order: t.order + 1,
        }
      } else if (t.id === todo.id) {
        return {
          ...t,
          order: t.order - 1,
        }
      }
      return t;
    });

    try {
      await api.post(`todos/${todo.id}/?move=up`)
      setTodos(newTodoOrder);
    } catch (err) { console.log(err) }
  }

  async function moveDownward(todo: IToDo) {
    const index = todo.order;
    const newTodoOrder = todos.map(t => {
      if (t.order === index + 1) {
        return {
          ...t,
          order: t.order - 1,
        }
      } else if (t.id === todo.id) {
        return {
          ...t,
          order: t.order + 1,
        }
      }
      return t;
    });

    try {
      await api.post(`todos/${todo.id}/?move=down`)
      setTodos(newTodoOrder);
    } catch (err) { }
  }

  async function deleteTodo(todo: IToDo) {
    try {
      await api.delete(`todos/${todo.id}`);
      setDeleteToastTitle('Sucesso!');
      setDeleteToastDescription('Tarefa apagada com sucesso!!');
      setToastStyle('success');
      setDeleteToastOpen(true);
      setTodos(todos.filter(t => t.id !== todo.id));
    } catch (err) {
      setDeleteToastTitle('Erro!');
      setDeleteToastDescription('Erro ao apagar a tarefa!!');
      setToastStyle('failure');
      setDeleteToastOpen(true);
    }
  }


  return (
    <div className='h-screen w-screen bg-gray-700'>
      <div className='w-full flex items-center justify-center'>
        <div className='mt-10 flex items-center gap-3'>
          <ListChecks className='text-3xl text-slate-300' weight='bold' />
          <h1 className='text-slate-300 text-3xl font-black'>TO DO</h1>
        </div>
      </div>
      <div>
        <div className='mt-28 mx-2 md:mx-10 bg-gray-500'>
          {
            todos.sort((a, b) => {
              if (a.order < b.order) {
                return -1;
              } else if (a.order === b.order) {
                return 0;
              } else {
                return 1;
              }
            }).map((item, index) => (
              <Todo
                key={item.id}
                todo={item}
                last={index === todos.length - 1}
                moveUpward={moveUpward}
                moveDownward={moveDownward}
                deleteTodo={deleteTodo}
                loadTodos={loadTodos}
                setToastDescription={setEditToastDescription}
                setToastOpen={setEditToastOpen}
                setToastStyle={setToastStyle}
                setToastTitle={setEditToastTitle}
              />
            ))
          }
        </div>
        <div className='mt-20 w-full flex justify-end'>
          <Dialog.Root open={newTodoOpen} onOpenChange={setNewTodoOpen}>
            <Dialog.Trigger className='bg-lime-300 p-4 mr-10 rounded-xl font-semibold text-xl flex flex-row items-center gap-1'>
              <ListPlus weight='bold' />
              Nova Tarefa
            </Dialog.Trigger>
            <NewTaskModal
              onSuccess={() => {
                setToastStyle('success');
                setCreateToastTitle('Criado!');
                setCreateToastDescription('A tarefa foi criada com sucesso!!');
                setCreateToastOpen(true);
                loadTodos();
                setNewTodoOpen(false);
              }}
              onFailure={(text?: string) => {
                setToastStyle('failure');
                setCreateToastTitle('Erro ao criar!');
                if (text) {
                  setCreateToastDescription(text);
                } else {
                  setCreateToastDescription('Aconteceu um erro durante a criação da tarefa!!');
                }
                setCreateToastOpen(true);
                setNewTodoOpen(false);
              }}
            />
          </Dialog.Root>
        </div>
      </div>
      {/* DELETE TOAST */}
      <Toast.Root>
        <Toast.Toast
          title={deleteToastTitle}
          description={deleteToastDescription}
          tstyle={toastStyle}
          open={deleteToastOpen}
          onOpenChange={setDeleteToastOpen}
        />
      </Toast.Root>
      {/* EDIT TOAST */}
      <Toast.Root>
        <Toast.Toast
          title={editToastTitle}
          description={editToastDescription}
          tstyle={toastStyle}
          open={editToastOpen}
          onOpenChange={setEditToastOpen}
        />
      </Toast.Root>
      {/* CREATE TOAST */}
      <Toast.Root>
        <Toast.Toast
          title={createToastTitle}
          description={createToastDescription}
          tstyle={toastStyle}
          open={createToastOpen}
          onOpenChange={setCreateToastOpen}
        />
      </Toast.Root>
    </div>
  );
}
