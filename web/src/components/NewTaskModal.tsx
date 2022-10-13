import * as DialogRadix from '@radix-ui/react-dialog';
import { Check, X } from 'phosphor-react';
import { FormEvent } from 'react';
import api from '../services/api';
import { Dialog } from './Dialog';
import Input from './Input';

interface Props {
  onSuccess: () => void;
  onFailure: (text?: string) => void;
}

export default function NewTaskModal({ onSuccess, onFailure }: Props) {

  async function handleCreate(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) {
      onFailure('Nome não pode ser nulo.');
      return;
    } else if (!data.cost) {
      onFailure('A tarefa deve possuir um valor.');
      return;
    } else if (!data.dueDate) {
      onFailure('Data limite precisa ser definida.');
      return;
    }

    try {
      await api.post('todos/', data);
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
      <form onSubmit={handleCreate} className='mt-8 flex flex-col gap-3'>
        <Input
          id='name'
          name='name'
          placeholder='Qual o nome da tarefa?'
          label='Nome'
        />
        <Input
          id='cost'
          name='cost'
          placeholder='Qual o custo da tarefa?'
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
            Confirmar
          </button>
        </footer>
      </form>
    </Dialog>
  );
}
