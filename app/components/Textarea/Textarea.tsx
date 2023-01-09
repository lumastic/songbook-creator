import type { ChangeEvent, InputHTMLAttributes } from "react";
import React, { useEffect, useRef } from "react";
import { namespaceAware } from "~/lib/fieldset";

export const Textarea: React.FC<InputHTMLAttributes<HTMLTextAreaElement>> =
  namespaceAware(({ className, ...props }) => {
    const ref = useRef<HTMLTextAreaElement>(null);

    function calcHeight(textarea: HTMLTextAreaElement) {
      textarea.style.height = "0px";
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = scrollHeight + "px";
    }

    function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
      calcHeight(e.target);
    }

    useEffect(() => {
      if (ref.current) calcHeight(ref.current);
    }, [ref]);

    return (
      <textarea
        ref={ref}
        rows={1}
        {...props}
        data-testid="textarea"
        onChange={onChange}
        wrap={"soft"}
        className={[
          !props.hidden && "block",
          "w-full bg-inherit focus:outline-none resize-none overflow-hidden placeholder-stone-400",
          className,
        ].join(" ")}
      />
    );
  });
