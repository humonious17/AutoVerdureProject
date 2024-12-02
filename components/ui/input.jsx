import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "w-full h-12 px-4 py-2 border-2 border-black rounded-full text-gray-900 placeholder-gray-500 bg-transparent focus:border-primaryMain focus:outline-none transition-colors duration-300",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
