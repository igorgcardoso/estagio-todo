import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowFatDown, ArrowFatUp, Pen, Trash } from 'phosphor-react';
import { ReactNode, useState } from "react";
import { IconButtonAlertModal, IconButtonModal } from './Button';
import DeleteTaskModal from './DeleteTaskModal';
import EditTaskModal from './EditTaskModal';

export interface IToDo {
  id: number,
  name: string;
  cost: number;
  dueDate: string;
  order: number;
};

interface Props {
  todo: IToDo;
  last: boolean;
  moveUpward: (todo: IToDo) => void;
  moveDownward: (todo: IToDo) => void;
  deleteTodo: (todo: IToDo) => void;
  setToastTitle: (title: string) => void;
  setToastDescription: (description: string) => void;
  setToastStyle: (style: 'success' | 'failure') => void;
  setToastOpen: (v: boolean) => void;
  loadTodos: () => void;
}

interface ToDoAttrProps {
  children: ReactNode;
}

function ToDoAttr({ children }: ToDoAttrProps) {
  return (
    <div className='w-1/4 flex items-center border-r-2 ml-1 md:ml-3'>
      <span className='ml-1 md:ml-4'>{children}</span>
    </div>
  );
}

export default function Todo({ todo, last, moveDownward, moveUpward, deleteTodo, setToastDescription, setToastTitle, setToastStyle, setToastOpen, loadTodos }: Props) {
  const [editTodoOpen, setEditTodoOpen] = useState(false);
  return (
    <div
      className={`flex w-full h-7 items-center ${todo.cost >= 1000 ? 'bg-amber-500' : 'bg-inherit'} text-xs md:text-xl`}
    >
      <div className='w-[3%] flex items-center border-r-2 ml-1 md:ml-3'>
        <span>{todo.id}</span>
      </div>
      <ToDoAttr>
        {todo.name}
      </ToDoAttr>
      <ToDoAttr>
        {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(todo.cost)}
      </ToDoAttr>
      <ToDoAttr>
        {Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(Date.parse(todo.dueDate))}
      </ToDoAttr>
      <div className='w-1/5 flex items-center justify-center gap-1 md:gap-3'>
        <Dialog.Root open={editTodoOpen} onOpenChange={setEditTodoOpen}>
          <IconButtonModal>
            <Pen className='w-3 h-3 md:w-5 md:h-5' />
          </IconButtonModal>
          <EditTaskModal
            todo={todo}
            onSuccess={() => {
              setToastStyle('success');
              setToastTitle('Editado!');
              setToastDescription('A tarefa foi editada com sucesso!!');
              setToastOpen(true);
              loadTodos();
              setEditTodoOpen(false);
            }}
            onFailure={(text) => {
              setToastStyle('failure');
              setToastTitle('Erro ao criar!');
              if (text) {
                setToastDescription(text);
              } else {
                setToastDescription('Aconteceu um erro durante a edição da tarefa!!');
              }
              setToastOpen(true);
              setEditTodoOpen(false);
            }}
          />
        </Dialog.Root>
        <AlertDialog.Root>
          <IconButtonAlertModal>
            <Trash className='w-3 h-3 md:w-5 md:h-5' />
          </IconButtonAlertModal>
          <DeleteTaskModal todo={todo} deleteTodo={deleteTodo} />
        </AlertDialog.Root>
        {!last ?
          <button onClick={() => moveDownward(todo)}>
            <ArrowFatDown className='w-3 h-3 md:w-5 md:h-5' />
          </button> : <div className='w-3 h-3 md:w-5 md:h-5' />
        }
        {todo.order !== 0 ?
          <button onClick={() => moveUpward(todo)}>
            <ArrowFatUp className='w-3 h-3 md:w-5 md:h-5' />
          </button> : <div className='w-3 h-3 md:w-5 md:h-5' />
        }
      </div>
    </div>
  );
}
