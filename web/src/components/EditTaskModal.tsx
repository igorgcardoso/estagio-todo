import * as DialogRadix from '@radix-ui/react-dialog';
import { Check, X } from 'phosphor-react';
import { FormEvent } from 'react';
import api from '../services/api';
import { Dialog } from './Dialog';
import Input from './Input';
import { IToDo } from './Todo';

interface Props {
  todo: IToDo;
  onSuccess: () => void;
  onFailure: (text?: string) => void;
}

export default function EditTaskModal({ todo, onSuccess, onFailure }: Props) {
  async function handleEdit(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    data.name = data.name ? data.name : todo.name;
    data.cost = data.cost ? data.cost : String(todo.cost);
    data.dueDate = data.dueDate ? data.dueDate : todo.dueDate;

    const { dueDate, cost, name } = data;

    if (name == todo.name && Number(cost) == todo.cost && dueDate == todo.dueDate) {
      onSuccess();
      return;
    }

    try {
      await api.put(`todos/${todo.id}/`, { name, cost, due_date: dueDate });
      onSuccess();
    } catch (err: any) {
      if (err.response) {
        onFailure(err.response.data?.detail)
      } else {
        onFailure()
      }
    }
  }

  return (
    <Dialog>
      <DialogRadix.Title className='text-3xl font-black'>Editar</DialogRadix.Title>
      <form onSubmit={handleEdit} className='mt-8 flex flex-col gap-3'>
        <Input
          id='name'
          name='name'
          placeholder={todo.name}
          label='Nome'
        />
        <Input
          id='cost'
          name='cost'
          placeholder={Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(todo.cost)}
          label='Custo'
          type='number'
        />
        <Input
          id='dueDate'
          name='dueDate'
          label='Data limite'
          type='date'
        />

        <footer className='mt-4 flex justify-end gap-4'>
          <DialogRadix.Close
            type='button'
            className='bg-red-700 px-5 h-12 rounded-md font-semibold flex flex-row gap-1 items-center hover:bg-red-800'>
            <X className='w-5 h-5' weight='bold' />
            Cancelar
          </DialogRadix.Close>
          <button
            className='bg-green-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-green-700'
            type='submit'
          >
            <Check className='w-5 h-5' weight='bold' />
            <span>Confirmar</span>
          </button>
        </footer>
      </form>
    </Dialog>
  );
}
