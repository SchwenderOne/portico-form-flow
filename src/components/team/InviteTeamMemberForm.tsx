
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { useTeam } from "@/context/TeamContext";
import { InviteData } from "@/types/team";

// Define the schema with required fields to match InviteData
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  role: z.enum(["Editor", "Viewer"], {
    required_error: "Please select a role",
  }),
});

// Use the zod schema to infer the form values type
type FormValues = z.infer<typeof formSchema>;

const InviteTeamMemberForm = () => {
  const { inviteTeamMember, canManageTeam } = useTeam();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "Viewer",
    },
  });

  const onSubmit = async (values: FormValues) => {
    // Now values will have the correct type with required properties
    const inviteData: InviteData = {
      email: values.email,
      role: values.role,
    };
    
    await inviteTeamMember(inviteData);
    form.reset();
  };

  if (!canManageTeam) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="colleague@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="w-full md:w-32">
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Team Member
        </Button>
      </form>
    </Form>
  );
};

export default InviteTeamMemberForm;
