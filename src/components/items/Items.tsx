import React from "react";
import Item from "./Item";
import { createClient } from '@/utils/supabase/server'

export interface ItemInterface {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
}

const Items: React.FC = async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("items").select("*");

  const items: ItemInterface[] = data ?? [];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <Item key={item.id} item={item} />
       
      ))}
    </div>
  );
};

export default Items;
