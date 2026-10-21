import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {EEquipmentType} from "@/types/enums.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {equipmentFormSchema, TEquipmentFormSchema} from "@/types/zodFormTypes/TZodEquipmentForm.ts";
import {TFloor} from "@/types/TFloor.ts";
import {TBuilding} from "@/types/TBuilding.ts";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type TEquipmentFormProps = {
    onSubmit: (data: TEquipmentFormSchema) => void;
    rooms: {
        id: number;
        roomNumber: number;
        building: TBuilding;
        floor: TFloor;
    }[];
}

export const AddEquipmentForm = ({ onSubmit, rooms }: TEquipmentFormProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const form = useForm<TEquipmentFormSchema>({
        resolver: zodResolver(equipmentFormSchema),
        defaultValues: {
            equipmentType: EEquipmentType.COMPUTER,
            quantity: 1,
            roomId: rooms[0]?.id || undefined,
        },
    });


    const handleSubmit = (data: TEquipmentFormSchema) => {
        onSubmit(data);
        form.reset();
        setIsFormOpen(false);
    };

    return (
        <Popover open={isFormOpen} onOpenChange={(isOpen) => setIsFormOpen(isOpen)}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Equipment
                </Button>
            </PopoverTrigger>
            <PopoverContent 
                className="w-[calc(100vw-2rem)] md:w-80" 
                side={isDesktop ? "right" : "bottom"}
                align={isDesktop ? "start" : "center"}
                sideOffset={10}
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">

                        {/* Equipment Type Dropdown */}
                        <FormField
                            control={form.control}
                            name="equipmentType"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Equipment Type</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select equipment type"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.values(EEquipmentType).map((type) => (
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
                        {/*Quantity*/}
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter quantity" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {/* Rooms dropdown */}
                        <FormField
                            control={form.control}
                            name="roomId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Room</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => field.onChange(Number(value))}
                                            value={field.value ? String(field.value) : ""}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select room" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {rooms.map((room) => (
                                                    <SelectItem key={room.id} value={String(room.id)}>
                                                        <span className="font-semibold">Room {room.roomNumber}</span> in {room.building.name} on floor {room.floor.floorNumber}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">Add Equipment</Button>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    );
};
