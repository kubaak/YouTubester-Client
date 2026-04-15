import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string;
};

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  const checkbox = (
    <input
      id={id}
      type="checkbox"
      className={cn(
        'h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );

  if (!label) {
    return checkbox;
  }

  return (
    <label htmlFor={id} className="flex items-center gap-2 text-sm text-foreground">
      {checkbox}
      <span>{label}</span>
    </label>
  );
}
