import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {buildingFormSchema, TBuildingFormSchema} from "@/types/zodFormTypes/TZodBuildingForm.ts";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type TBuildingFormProps = {
    onSubmit: (data: TBuildingFormSchema) => void;
};

export const AddBuildingForm = ({ onSubmit}: TBuildingFormProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const form = useForm<TBuildingFormSchema>({
        resolver: zodResolver(buildingFormSchema),
        defaultValues: {
            name: "",
            street: "",
            city: "",
            postalCode: "",
        },
    });


    const handleSubmit = (data: TBuildingFormSchema) => {
        onSubmit(data);
        form.reset();
        setIsFormOpen(false);
    };

    return (
        <Popover open={isFormOpen} onOpenChange={(isOpen) => setIsFormOpen(isOpen)}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Building
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

                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter building name" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {/* Street */}
                        <FormField
                            control={form.control}
                            name="street"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Street</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter building street" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {/* City */}
                        <FormField
                            control={form.control}
                            name="city"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter building city" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {/* Postal code */}
                        <FormField
                            control={form.control}
                            name="postalCode"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Postal code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter building postal code" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">Add Building</Button>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    );
};
