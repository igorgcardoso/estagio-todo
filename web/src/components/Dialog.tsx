import * as AlertDialogRadix from '@radix-ui/react-alert-dialog';
import * as DialogRadix from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode
}

export function Dialog({ children }: Props) {
  return (
    <DialogRadix.Portal>
      <DialogRadix.Overlay className='bg-black/60 inset-0 fixed'>
        <DialogRadix.Content
          className='fixed bg-stone-500 py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-[480px] shadow-lg shadow-black/25'>
          {children}
        </DialogRadix.Content>
      </DialogRadix.Overlay>
    </DialogRadix.Portal>
  );
}

export function AlertDialog({ children }: Props) {
  return (
    <AlertDialogRadix.Portal>
      <AlertDialogRadix.Overlay className='bg-black/60 inset-0 fixed'>
        <AlertDialogRadix.Content
          className='fixed bg-stone-500 py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-[480px] shadow-lg shadow-black/25'>
          {children}
        </AlertDialogRadix.Content>
      </AlertDialogRadix.Overlay>
    </AlertDialogRadix.Portal>
  );
}
