import * as AlertDialogRadix from '@radix-ui/react-alert-dialog';
import { Check, X } from 'phosphor-react';
import { AlertDialog } from './Dialog';
import { IToDo } from './Todo';

interface Props {
  todo: IToDo;
  deleteTodo: (todo: IToDo) => void;
}

export default function DeleteTaskModal({ todo, deleteTodo }: Props) {
  return (
    <AlertDialog>
      <AlertDialogRadix.Title className='text-3xl font-black'>Tem certeza que deseja apagar?</AlertDialogRadix.Title>

      <footer className='mt-10 flex justify-end gap-4'>
        <AlertDialogRadix.Cancel
          className='bg-green-600 px-5 h-12 rounded-md font-semibold flex flex-row gap-1 items-center hover:bg-green-700'>
          <X className='w-5 h-5' weight='bold' />
          <span>Não</span>
        </AlertDialogRadix.Cancel>
        <AlertDialogRadix.Action
          className=' bg-red-700 px-5 h-12 rounded-md font-semibold flex items-center gap-3  hover:bg-red-800'
          onClick={() => deleteTodo(todo)}>
          <Check className='w-5 h-5' weight='bold' />
          <span>Sim</span>
        </AlertDialogRadix.Action>
      </footer>
    </AlertDialog>
  );
}
