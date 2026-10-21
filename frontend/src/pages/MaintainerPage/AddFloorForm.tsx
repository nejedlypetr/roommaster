import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {floorFormSchema, TFloorFormSchema} from "@/types/zodFormTypes/TZodFloorForm.ts";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { TBuilding } from "@/types/TBuilding";

type TFloorFormProps = {
    onSubmit: (data: TFloorFormSchema) => void;
    buildings: TBuilding[];
};

export const AddFloorForm = ({ onSubmit, buildings }: TFloorFormProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const form = useForm<TFloorFormSchema>({
        resolver: zodResolver(floorFormSchema),
        defaultValues: {
            floorNumber: 1,
            buildingId: 1,
        },
    });


    const handleSubmit = (data: TFloorFormSchema) => {
        onSubmit(data);
        form.reset();
        setIsFormOpen(false);
    };

    return (
        <Popover open={isFormOpen} onOpenChange={(isOpen) => setIsFormOpen(isOpen)}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Floor
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

                        {/* Number */}
                        <FormField
                            control={form.control}
                            name="floorNumber"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Floor number</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter floor number" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {/* Building Dropdown */}
                        <FormField
                            control={form.control}
                            name="buildingId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Building</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => field.onChange(Number(value))}
                                            value={field.value ? String(field.value) : ""}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select building" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {buildings.map((building) => (
                                                    <SelectItem key={building.id} value={String(building.id)}>
                                                        {building.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Add Floor</Button>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    );
};
