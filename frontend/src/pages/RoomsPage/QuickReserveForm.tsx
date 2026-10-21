import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EReservationPurpose } from "@/types/enums";
import { TimePicker } from "@/components/TimePicker";
import { quickReservationFormSchema, TQuickReservationFormSchema } from "@/types/zodFormTypes/TZodQuickReservationForm";
import { DatePicker } from "@/components/DatePicker";
import { TBuilding } from "@/types/TBuilding";
import { TFloor } from "@/types/TFloor";
import {Textarea} from "@/components/ui/textarea.tsx";
import { useMediaQuery } from "@/hooks/useMediaQuery";


type TReserveFormProps = {
    onSubmit: (data: TQuickReservationFormSchema) => void;
    rooms: {
        id: number;
        roomNumber: number;
        openingTime: number;
        closingTime: number;
        building: TBuilding;
        floor: TFloor;
    }[];
};

export const QuickReserveForm = ({ onSubmit, rooms }: TReserveFormProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [timeBoundaries] = useState({
        openingTime: rooms[0]?.openingTime || 0,
        closingTime: rooms[0]?.closingTime || 95,
    });

    const form = useForm<TQuickReservationFormSchema>({
        resolver: zodResolver(quickReservationFormSchema),
        defaultValues: {
            roomId: rooms[0]?.id || undefined,
            purpose: EReservationPurpose.MEETING,
            reservationDate: new Date(),
            startTimeSlot: timeBoundaries.openingTime,
            endTimeSlot: timeBoundaries.closingTime,
            description: "",
        },
    });

    const handleRoomChange = (roomId: number) => {
        const selectedRoom = rooms.find((room) => room.id === roomId);
        if (selectedRoom) {
            form.setValue<"startTimeSlot">("startTimeSlot", selectedRoom.openingTime);
            form.setValue<"endTimeSlot">("endTimeSlot", selectedRoom.closingTime);
        }
        form.setValue<"roomId">("roomId", roomId);
    };

    const handleSubmit = (data: TQuickReservationFormSchema) => {
        onSubmit(data);
        form.reset();
        setIsFormOpen(false);
    };

    return (
        <Popover open={isFormOpen} onOpenChange={(isOpen) => setIsFormOpen(isOpen)}>
            <PopoverTrigger asChild>
                <Button size="lg" className="self-end text-base">
                    Create quick reservation
                </Button>
            </PopoverTrigger>
            <PopoverContent 
                className="w-[calc(100vw-2rem)] md:w-96" 
                side={isDesktop ? "right" : "bottom"}
                align={isDesktop ? "start" : "center"}
                sideOffset={10}
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        {/* Room Dropdown */}
                        <FormField
                            control={form.control}
                            name="roomId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Room</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => handleRoomChange(Number(value))}
                                            value={field.value ? String(field.value) : ""}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select room"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {rooms.map((room) => (
                                                    <SelectItem key={room.id} value={String(room.id)}>
                                                        <span className="font-semibold">Room {room.roomNumber}</span> (in {room.building.name} on
                                                        floor {room.floor.floorNumber})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {/* Purpose */}
                        <FormField
                            control={form.control}
                            name="purpose"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Purpose</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select purpose"/>
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
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {/* Reservation Date */}
                        <FormField
                            control={form.control}
                            name="reservationDate"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="mr-4">Date</FormLabel>
                                    <FormControl>
                                        <DatePicker date={field.value} onSelect={field.onChange}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4">
                            {/* Start Time */}
                            <FormField
                                control={form.control}
                                name="startTimeSlot"
                                render={({field}) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Start Time</FormLabel>
                                        <FormControl>
                                            <TimePicker
                                                value={
                                                    field.value !== undefined
                                                        ? new Date(0, 0, 0, Math.floor(field.value / 4), (field.value % 4) * 15)
                                                        : new Date(0, 0, 0, Math.floor(timeBoundaries.openingTime / 4), (timeBoundaries.openingTime % 4) * 15)
                                                }
                                                onSelect={(date) => {
                                                    const totalMinutes = date.getHours() * 60 + date.getMinutes();
                                                    field.onChange(Math.floor(totalMinutes / 15));
                                                }}
                                                minTime={new Date(0, 0, 0, Math.floor(timeBoundaries.openingTime / 4), (timeBoundaries.openingTime % 4) * 15)}
                                                maxTime={new Date(0, 0, 0, Math.floor(timeBoundaries.closingTime / 4), (timeBoundaries.closingTime % 4) * 15)}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            {/* End Time */}
                            <FormField
                                control={form.control}
                                name="endTimeSlot"
                                render={({field}) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>End Time</FormLabel>
                                        <FormControl>
                                            <TimePicker
                                                value={
                                                    field.value !== undefined
                                                        ? new Date(0, 0, 0, Math.floor(field.value / 4), (field.value % 4) * 15)
                                                        : new Date(0, 0, 0, Math.floor(timeBoundaries.closingTime / 4), (timeBoundaries.closingTime % 4) * 15)
                                                }
                                                onSelect={(date) => {
                                                    const totalMinutes = date.getHours() * 60 + date.getMinutes();
                                                    field.onChange(Math.floor(totalMinutes / 15));
                                                }}
                                                minTime={new Date(0, 0, 0, Math.floor(timeBoundaries.openingTime / 4), (timeBoundaries.openingTime % 4) * 15)}
                                                maxTime={new Date(0, 0, 0, Math.floor(timeBoundaries.closingTime / 4), (timeBoundaries.closingTime % 4) * 15)}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Add a description"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                            <Button type="submit" className="w-full">Create quick reservation</Button>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    );
};
