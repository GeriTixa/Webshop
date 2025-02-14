'use client'

import { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  username: z.string().min(1, "Username is required"),
  website: z.string().url("Invalid URL").optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      username: "",
      website: "",
    },
  });

  const getProfile = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, username, website")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      if (data) {
        form.reset({
          fullname: data.full_name || "",
          username: data.username || "",
          website: data.website || "",
        });
      }
    } catch (error) {
      alert(`Error loading user data! ${error}`);
    } finally {
      setLoading(false);
    }
  }, [user, supabase, form]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  async function updateProfile(values: FormValues) {
    try {
      setLoading(true);
      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: values.fullname,
        username: values.username,
        website: values.website,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert(`Error updating the data! ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return (
      <Card className="w-64 p-4 mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(updateProfile)}>
            <FormField
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input id="fullname" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input id="username" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input id="website" type="url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Loading..." : "Update Profile"}
            </Button>
          </form>
        </Form>

        <form action="/auth/signout" method="post" className="mt-4">
          <Button className="w-full" type="submit">
            Sign Out
          </Button>
        </form>
      </Card>
  );
}
