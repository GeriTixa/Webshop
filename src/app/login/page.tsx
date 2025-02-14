'use client'

import { login } from "@/app/login/actions";
import { Card } from "@/components/ui/card";
import Wrapper from "@/components/wrapper/Wrapper";
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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });
    
  return (
    <Wrapper>
      <Card className="w-64 p-4 mx-auto">
        <Form {...form}>
          <form>
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input id="email" type="email" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input id="password" type="password" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <Button formAction={login} type="submit" className="w-full mt-4">
                Log in
              </Button>
            </FormItem>
           {/*  <FormItem>
              <Button formAction={signup} type="submit" className="w-full mt-2">
                Sign up
              </Button>
            </FormItem> */}
          </form>
        </Form>
      </Card>
    </Wrapper>
  );
}