"use client";
import React, { useState, forwardRef, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

// shadcn
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// utils
import { cn } from "@/lib/utils";

// Date input props
interface DateInputProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  width?: string;
}

const DateInputComponent = (
  {
    value,
    onChange,
    placeholder = "Select date",
    disabled = false,
    className,
    width = "w-full",
    ...props
  }: DateInputProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const [open, setOpen] = useState(false);

  const triggerClasses = cn(
    `flex h-9 ${width} items-center justify-between whitespace-nowrap border-0 border-b-2 border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-b-2 focus:border-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1`,
    className
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={ref}
        className={triggerClasses}
        disabled={disabled}
        {...props}
      >
        {value ? (
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {format(value, "dd/MM/yyyy")}
          </span>
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
        <CalendarIcon size={16} className="text-blue-500" />
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={10}
        side="bottom"
        className="min-w-[--radix-popper-anchor-width] p-0"
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange?.(date);
            setOpen(false);
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          captionLayout="dropdown"
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  );
};

DateInputComponent.displayName = "DateInputComponent";

export const DateInput = forwardRef(DateInputComponent); 