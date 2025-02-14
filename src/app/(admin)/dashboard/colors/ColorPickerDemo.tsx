"use client";

import { useState } from "react";
import { ColorPicker } from "@/components/ui/color-picker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { lightenHSL } from "@/components/ui/color-complimentary";

export const ColorPickerDemo = () => {
  const [color, setColor] = useState("hsl(0, 100.00%, 0.20%)");
  const [invertedColor, setInvertedColor] = useState("hsl(0, 0.00%, 99.60%)");

  const handleSave = () => {
    console.log("Save color", color);
  };

  return (
    <div className="flex flex-row space-y-4 gap-4">
      <Card className="w-36">
        <CardHeader>
          <CardTitle>Color picker</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ColorPicker
            onChange={(v) => {
              setColor(v);
              setInvertedColor(lightenHSL(v, 24, 6.4));
            }}
            value={color}
          />
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSave}>
            Save
          </Button>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-4 items-center p-4 rounded-lg border border-foreground">
        <Button
          style={{
            backgroundColor: color,
          }}
        >
          Preview button
        </Button>
        <p>
          <span
            style={{
              color: color,
            }}
          >
            preview text
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-4 items-center bg-foreground p-4 rounded-lg">
        <Button
          style={{
            backgroundColor: invertedColor,
          }}
          className="text-foreground"
        >
          Preview Dark button
        </Button>
        <p>
          <span
            style={{
              color: invertedColor,
            }}
          >
            preview dark text
          </span>
        </p>
      </div>
    </div>
  );
};
