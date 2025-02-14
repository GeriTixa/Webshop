'use client';

import { useEffect } from "react";
import { colorVariables, IColorVariables } from "@/lib/color-variables";

export function InjectUserClass() {
  useEffect(() => {
    function injectUserClass(variables: IColorVariables) {
      const style = document.createElement('style');
      style.type = 'text/css';
      let css = '.user {';
      Object.keys(variables).forEach(key => {
        css += `--${key}: ${variables[key as keyof IColorVariables]};`;
      });
      css += '}';
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);
    }

    injectUserClass(colorVariables);
  }, []);

  return null;
}