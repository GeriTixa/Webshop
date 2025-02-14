"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Form,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
  FormControl,
} from "../ui/form";
import { createClient } from "@/utils/supabase/client";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  imageSrc: z.string().url("Invalid URL"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(z.string()).min(1, "Tags are required"),
});

type FormValues = z.infer<typeof formSchema>;

interface User {
  id: string;
  email: string;
  role: string;
}

const AddItem: React.FC = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user as User);
      } else {
        console.error("User is not authenticated");
      }
    };

    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      imageSrc: "https://placehold.co/600x400.png",
      tags: [],
    },
  });

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      alert("No file selected.");
      return;
    }
    const file = files[0];
    setFile(file);
  };

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    try {
      if (!file) {
        alert("No file selected.");
        return;
      }
      const bucket = "items";
      const { data: image, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(file.name, file);

      if (!image) {
        return;
      }

      if (uploadError) {
        alert("Error uploading file.");
        return;
      }

      const { data: imgUrl } = await supabase.storage
        .from("items")
        .getPublicUrl(file.name);
      if (imgUrl) {
        setValue("imageSrc", imgUrl.publicUrl);
        setImageUrl(imgUrl.publicUrl);
      }

      const { data: item, error } = await supabase.from("items").insert([
        {
          title: data.title,
          description: data.description,
          imageSrc: imgUrl.publicUrl,
          tags: data.tags,
        },
      ]);
      if (error) {
        console.error("Error inserting item", error);
      } else {
        console.log("Item inserted", item);
      }
    } catch (error) {
      console.error("Error inserting item", error);
    }
  };

  const { setValue, watch } = form;
  const tags = watch("tags", []);

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      if (value && !tags.includes(value)) {
        setValue("tags", [...tags, value]);
      }
      e.currentTarget.value = "";
    }
  };

  const removeTag = (tag: string) => {
    setValue(
      "tags",
      tags.filter((t: string) => t !== tag)
    );
  };

  return (
    <Card className="w-64 p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Add title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="imageSrc"
            render={() => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    type="file"
                    onChange={uploadFile}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Uploaded Image"
                width={300}
                height={300}
                className="rounded-lg border border-gray-300"
              />
            )}
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Add Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <Input placeholder="Type and press Enter" onKeyDown={addTag} />
            </FormControl>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  className="cursor-pointer"
                  onClick={() => removeTag(tag)}
                >
                  {tag} ✕
                </Badge>
              ))}
            </div>
            <FormMessage />
          </FormItem>

          <Button type="submit" className="w-full">
            <PlusIcon className="mr-2" size={16} /> Add
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default AddItem;
