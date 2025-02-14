'use client';

import { forwardRef, useMemo, useState } from 'react';
import { HslColorPicker } from 'react-colorful';
import { cn } from '@/lib/utils';
import { useForwardedRef } from '@/lib/use-forwarded-ref';
import type { ButtonProps } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<ButtonProps, 'value' | 'onChange' | 'onBlur'> & ColorPickerProps
>(
  (
    { disabled, value, onChange, onBlur, name, className, ...props },
    forwardedRef
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const [open, setOpen] = useState(false);

    // Parse the HSL value or default to a fallback color
    const parsedValue = useMemo(() => {
      return value || 'hsl(0, 100%, 50%)';
    }, [value]);

    // Convert HSL string to an object for the HslColorPicker
    const hslValue = useMemo(() => {
      const match = parsedValue.match(/hsl\((\d+), (\d+)%, (\d+)%\)/);
      if (match) {
        return {
          h: parseInt(match[1], 10),
          s: parseInt(match[2], 10),
          l: parseInt(match[3], 10),
        };
      }
      return { h: 0, s: 100, l: 50 }; // Fallback to red
    }, [parsedValue]);

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
          <Button
            {...props}
            className={cn('block', className)}
            name={name}
            onClick={() => {
              setOpen(true);
            }}
            size='icon'
            style={{
              backgroundColor: parsedValue,
            }}
            variant='outline'
          >
            <div />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full'>
          <HslColorPicker
            color={hslValue}
            onChange={(color) => {
              const hslString = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
              onChange(hslString);
            }}
          />
          <Input
            maxLength={18}
            onChange={(e) => {
              onChange(e?.currentTarget?.value);
            }}
            ref={ref}
            value={parsedValue}
          />
        </PopoverContent>
      </Popover>
    );
  }
);
ColorPicker.displayName = 'ColorPicker';

export { ColorPicker };