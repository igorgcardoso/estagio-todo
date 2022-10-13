import * as ToastRadix from '@radix-ui/react-toast';
import { w } from 'windstitch';

interface Props extends ToastRadix.ToastProps {
  title: string;
  description: string;
  tstyle: 'success' | 'failure';
}

const Root = w(ToastRadix.Root, {
  className: 'shadow-lg shadow-black/25 p-4 w-full h-full rounded-xl overflow-hidden',
  variants: {
    tstyle: (style: string) => (style === 'success' ? 'bg-green-400' : 'bg-red-400'),
  },
});

function Toast({ title, description, tstyle, open, onOpenChange, ...rest }: Props) {
  return (
    <Root
      open={open}
      onOpenChange={onOpenChange}
      tstyle={tstyle}
      {...rest}
    >
      <ToastRadix.Title>{title}</ToastRadix.Title>
      <ToastRadix.Description>{description}</ToastRadix.Description>
    </Root>
  );
}

function ToastRoot({ duration = 3000, children, ...rest }: ToastRadix.ToastProviderProps) {
  return (
    <ToastRadix.Provider duration={duration} {...rest}>
      <ToastRadix.Viewport className='fixed top-2 right-4 flex flex-col p-6 gap-2 w-96 max-w-full m-0 z-50  rounded-lg'>
        {children}
      </ToastRadix.Viewport>
    </ToastRadix.Provider>
  );
}

export default {
  Root: ToastRoot,
  Toast,
}
