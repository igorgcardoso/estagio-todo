import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as Dialog from "@radix-ui/react-dialog";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> { }

export function IconButtonModal(props: Props) {
  return (
    <Dialog.Trigger className='flex justify-center items-center hover:opacity-60' {...props}>
      {props.children}
    </Dialog.Trigger>
  );
}

export function IconButtonAlertModal(props: Props) {
  return (
    <AlertDialog.Trigger className='flex justify-center items-center hover:opacity-60' {...props}>
      {props.children}
    </AlertDialog.Trigger>
  );
}
