import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TRoomFormSchema, roomFormSchema } from "@/types/zodFormTypes/TZodRoomForm";
import { ERoomType, EDepartment } from "@/types/enums";
import {TimePicker} from "@/components/TimePicker.tsx";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type TRoomFormProps = {
    onSubmit: (data: TRoomFormSchema) => void;
    floors: { id: number; floorNumber: number; buildingId: number }[];
    buildings: { id: number; name: string }[];
};

export const AddRoomForm = ({ onSubmit, floors, buildings}: TRoomFormProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const form = useForm<TRoomFormSchema>({
        resolver: zodResolver(roomFormSchema),
        defaultValues: {
            roomType: ERoomType.MEETING_ROOM,
            roomNumber: 1,
            openingTime: 32,
            closingTime: 72,
            capacity: 1,
            description: "",
            department: EDepartment.FINANCE,
            floorId: 1,
        },
    });


    const handleSubmit = (data: TRoomFormSchema) => {
        onSubmit(data);
        form.reset();
        setIsFormOpen(false);
    };

    const getBuildingName = (buildingId: number): string => {
        const building = buildings.find((building) => building.id === buildingId);
        return building ? building.name : "Unknown Building";
    };

    return (
        <Popover open={isFormOpen} onOpenChange={(isOpen) => setIsFormOpen(isOpen)}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Room
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
                        {/* Room Type Dropdown */}
                        <FormField
                            control={form.control}
                            name="roomType"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Room Type</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select room type"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(ERoomType).map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {/* Room number */}
                        <FormField
                            control={form.control}
                            name="roomNumber"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Room number</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter room number" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {/* Capacity */}
                        <FormField
                            control={form.control}
                            name="capacity"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Capacity</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter room capacity" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {/* Department Dropdown */}
                        <FormField
                            control={form.control}
                            name="department"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Department</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select department"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(EDepartment).map((dept) => (
                                                    <SelectItem key={dept} value={dept}>
                                                        {dept}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter room description" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {/* Location Dropdown for Floors */}
                        <FormField
                            control={form.control}
                            name="floorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location (Floor)</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select floor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {floors.map((floor) => (
                                                    <SelectItem key={floor.id} value={String(floor.id)}>
                                                        Floor {floor.floorNumber} of{" "}
                                                        {getBuildingName(floor.buildingId)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="openingTime"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Opening Time</FormLabel>
                                        <FormControl>
                                            <TimePicker
                                                value={
                                                    field.value !== undefined
                                                        ? new Date(0, 0, 0, Math.floor(field.value / 4), (field.value % 4) * 15)
                                                        : new Date(0, 0, 0, 8, 0) // Default to 8:00
                                                }
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

                            <FormField
                                control={form.control}
                                name="closingTime"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Closing Time</FormLabel>
                                        <FormControl>
                                            <TimePicker
                                                value={
                                                    field.value !== undefined
                                                        ? new Date(0, 0, 0, Math.floor(field.value / 4), (field.value % 4) * 15)
                                                        : new Date(0, 0, 0, 18, 0) // Default to 18:00
                                                }
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
                        <Button type="submit" className="w-full">Add Room</Button>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    );
};
