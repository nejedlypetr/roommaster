import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { TFaultFormSchema, faultFormSchema } from "@/types/zodFormTypes/TZodFaultForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type TAddFaultFormProps = {
  onSubmit: (data: TFaultFormSchema) => void;
};

export const AddFaultForm = ({ onSubmit }: TAddFaultFormProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const form = useForm<TFaultFormSchema>({
    resolver: zodResolver(faultFormSchema),
    defaultValues: {
      cause: "",
      description: "",
    },
  });

  const handleSubmit = (data: TFaultFormSchema) => {
    onSubmit(data);
    form.reset();
    setIsFormOpen(false);
  };

  return (
    <Popover open={isFormOpen} onOpenChange={(isOpen) => setIsFormOpen(isOpen)}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add fault
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" side="right" align="start" sideOffset={10}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cause"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cause</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter fault cause" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter fault description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Add room fault</Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};