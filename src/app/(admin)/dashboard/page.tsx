"use client";

import { useState } from "react";
import { ColorPickerDemo } from "./colors/ColorPickerDemo";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import AddItem from "@/components/items/AddItem";
import Wrapper from "@/components/wrapper/Wrapper";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Wrapper>
      <Collapsible className="w-[350px] space-y-2">
        <div className="flex items-center px-4">
          <h4 className="text-sm font-semibold">Color Settings</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Color Settings</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="px-12 py-6">
            <ColorPickerDemo />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        className="w-[350px] space-y-2"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="flex items-center px-4">
          <h4 className="text-sm font-semibold">Add new item</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Add new item</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="px-12 py-6">
            <AddItem />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Wrapper>
  );
}
