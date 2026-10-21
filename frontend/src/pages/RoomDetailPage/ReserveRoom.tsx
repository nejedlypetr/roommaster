import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EReservationPurpose } from "@/types/enums";
import { TReservationFormSchema, reservationFormSchema } from "@/types/zodFormTypes/TZodReservationForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TimePicker } from "@/components/TimePicker";
import { DatePicker } from "@/components/DatePicker";
import { timeSlotToDate } from "@/utils/dateUtils";

type TReserveRoomProps = {
  onSubmit: (data: TReservationFormSchema) => void;
  isLoading?: boolean;
  openingTimeSlot: number;
  closingTimeSlot: number;
  formError?: string | null;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const ReserveRoom = ({ onSubmit, isLoading, openingTimeSlot, closingTimeSlot, formError, open, setOpen }: TReserveRoomProps) => {

    const form = useForm<TReservationFormSchema>({
        resolver: zodResolver(reservationFormSchema),
        defaultValues: {
        purpose: undefined,
        startTimeSlot: undefined,
        endTimeSlot: undefined,
        reservationDate: new Date(),
        description: "",
        },
    });

    return (
        <Popover 
            open={open} 
            onOpenChange={(isOpen) => setOpen(isOpen)}
        >
            <PopoverTrigger asChild>
                <Button size="lg" className="self-end">
                    Reserve now!
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96" side="bottom" sideOffset={10}>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                    control={form.control}
                    name="purpose"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Purpose</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select purpose" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {Object.values(EReservationPurpose).map((purpose) => (
                                <SelectItem key={purpose} value={purpose}>
                                {purpose}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="reservationDate"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="mr-4">Date</FormLabel>
                        <FormControl>
                            <DatePicker
                            date={field.value}
                            onSelect={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="startTimeSlot"
                        render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                            <TimePicker 
                                value={field.value ? new Date(0, 0, 0, Math.floor(field.value / 4), (field.value % 4) * 15) : undefined}
                                onSelect={(date) => {
                                const totalMinutes = date.getHours() * 60 + date.getMinutes();
                                field.onChange(Math.floor(totalMinutes / 15));
                                }}
                                minTime={timeSlotToDate(openingTimeSlot)}
                                maxTime={timeSlotToDate(closingTimeSlot)}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endTimeSlot"
                        render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>End Time</FormLabel>
                            <FormControl>
                            <TimePicker 
                                value={field.value ? new Date(0, 0, 0, Math.floor(field.value / 4), (field.value % 4) * 15) : undefined}
                                onSelect={(date) => {
                                const totalMinutes = date.getHours() * 60 + date.getMinutes();
                                field.onChange(Math.floor(totalMinutes / 15));
                                }}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    </div>

                    <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Enter description" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Reserving...' : 'Reserve Room'}
                    </Button>
                    {formError && <p className="text-red-500">{formError}</p>}
                </form>
                </Form>
            </PopoverContent>
        </Popover>
    );
};