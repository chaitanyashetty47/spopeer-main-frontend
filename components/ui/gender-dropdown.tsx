"use client";
import React, { useCallback, useState, forwardRef, useEffect } from "react";

// shadcn
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// utils
import { cn } from "@/lib/utils";

// assets
import { ChevronDown, CheckIcon, User } from "lucide-react";

// Gender interface
export interface Gender {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

// Dropdown props
interface GenderDropdownProps {
  options?: Gender[];
  onChange?: (gender: Gender) => void;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
}

const defaultGenderOptions: Gender[] = [
  {
    value: "male",
    label: "Male",
    icon: <User className="h-4 w-4" />,
  },
  {
    value: "female",
    label: "Female",
    icon: <User className="h-4 w-4" />,
  },
  {
    value: "other",
    label: "Other",
    icon: <User className="h-4 w-4" />,
  },
];

const GenderDropdownComponent = (
  {
    options = defaultGenderOptions,
    onChange,
    defaultValue,
    disabled = false,
    placeholder = "Select gender",
    ...props
  }: GenderDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const [open, setOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState<Gender | undefined>(
    undefined
  );

  useEffect(() => {
    if (defaultValue) {
      const initialGender = options.find(
        (gender) => gender.value === defaultValue
      );
      if (initialGender) {
        setSelectedGender(initialGender);
      } else {
        // Reset selected gender if defaultValue is not found
        setSelectedGender(undefined);
      }
    } else {
      // Reset selected gender if defaultValue is undefined or null
      setSelectedGender(undefined);
    }
  }, [defaultValue, options]);

  const handleSelect = useCallback(
    (gender: Gender) => {
      console.log("👤 GenderDropdown value: ", gender);
      setSelectedGender(gender);
      onChange?.(gender);
      setOpen(false);
    },
    [onChange]
  );

  const triggerClasses = cn(
    "flex h-9 w-full items-center justify-between whitespace-nowrap border-0 border-b-2 border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-b-2 focus:border-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={ref}
        className={triggerClasses}
        disabled={disabled}
        {...props}
      >
        {selectedGender ? (
          <div className="flex items-center flex-grow w-0 gap-2 overflow-hidden">
            <div className="inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full">
              {selectedGender.icon}
            </div>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {selectedGender.label}
            </span>
          </div>
        ) : (
          <span>{placeholder}</span>
        )}
        <ChevronDown size={16} className="text-blue-500" />
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={10}
        side="bottom"
        className="min-w-[--radix-popper-anchor-width] p-0"
      >
        <Command className="w-full max-h-[200px] sm:max-h-[270px]">
          <CommandList>
            <div className="sticky top-0 z-10 bg-popover">
              <CommandInput placeholder="Search gender..." />
            </div>
            <CommandEmpty>No gender found.</CommandEmpty>
            <CommandGroup>
              {options.map((option, key: number) => (
                <CommandItem
                  className="flex items-center w-full gap-2"
                  key={key}
                  onSelect={() => handleSelect(option)}
                >
                  <div className="flex flex-grow w-0 space-x-2 overflow-hidden">
                    <div className="inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full">
                      {option.icon}
                    </div>
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {option.label}
                    </span>
                  </div>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 shrink-0",
                      option.value === selectedGender?.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

GenderDropdownComponent.displayName = "GenderDropdownComponent";

export const GenderDropdown = forwardRef(GenderDropdownComponent); 