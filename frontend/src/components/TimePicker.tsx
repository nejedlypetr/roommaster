import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ClockIcon } from "lucide-react";
import { format } from "date-fns";
import { ScrollArea } from "./ui/scroll-area";

type TTimePickerProps = {
  value?: Date;
  onSelect: (date: Date) => void;
  className?: string;
  maxTime?: Date;
  minTime?: Date;
};

export const TimePicker = ({ value, onSelect, className, maxTime, minTime }: TTimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hours = Array.from(
    { length: ((maxTime?.getHours() ?? 23) - (minTime?.getHours() ?? 0)) + 1 },
    (_, i) => i + (minTime?.getHours() ?? 0)
  );
  const minutes = Array.from({ length: 4 }, (_, i) => i * 15);

  const handleTimeChange = (type: "hour" | "minute", newValue: number) => {
    const newDate = new Date();
    newDate.setHours(type === "hour" ? newValue : (value?.getHours() ?? 0));
    newDate.setMinutes(type === "minute" ? newValue : (value?.getMinutes() ?? 0));
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    onSelect(newDate);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <ClockIcon className="mr-2 h-4 w-4" />
          {value ? (
            format(value, "HH:mm")
          ) : (
            <span>Pick a time</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex divide-x">
          <ScrollArea className="h-[300px] w-[100px]">
            <div className="flex flex-col p-2">
              {hours.map((hour) => (
                <Button
                  key={hour}
                  variant={value?.getHours() === hour ? "default" : "ghost"}
                  className="w-full"
                  onClick={() => handleTimeChange("hour", hour)}
                >
                  {hour.toString().padStart(2, '0')}:00
                </Button>
              ))}
            </div>
          </ScrollArea>
          <ScrollArea className="h-[300px] w-[100px]">
            <div className="flex flex-col p-2">
              {minutes.map((minute) => (
                <Button
                  key={minute}
                  variant={value?.getMinutes() === minute ? "default" : "ghost"}
                  className="w-full"
                  onClick={() => handleTimeChange("minute", minute)}
                >
                  {minute.toString().padStart(2, '0')}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}; 