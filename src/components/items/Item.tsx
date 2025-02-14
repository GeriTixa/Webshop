import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { ShoppingCart } from "lucide-react";
import { ItemInterface } from "./Items";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface ItemProps {
  item: ItemInterface;
}

const Item: React.FC<ItemProps> = async ({ item }) => {
  return (
    <Card key={item.id}>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-64">
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            sizes="(max-width: 768px), 100vw"
          />
        </div>
        <CardDescription>{item.description}</CardDescription>
        {item.tags.map((tag) => (
          <Badge key={tag} className="mr-2">
            {tag}
            </Badge>
        ))}
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <ShoppingCart /> Buy
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Item;
