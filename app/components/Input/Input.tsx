import type { InputHTMLAttributes } from "react";
import { namespaceAware } from "~/lib/fieldset";

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> =
  namespaceAware(({ className, ...props }) => {
    return (
      <input
        data-testid="input"
        className={[
          !props.hidden && "block",
          "w-full bg-inherit focus:outline-none placeholder-neutral-400",
          className,
        ].join(" ")}
        {...props}
      />
    );
  });
