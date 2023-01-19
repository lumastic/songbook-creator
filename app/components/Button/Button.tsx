import { Link } from "@remix-run/react";
import type { RemixLinkProps } from "@remix-run/react/dist/components";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import React from "react";

type Props = {
  variant?: Variants;
  size?: Sizes;
  disabled?: boolean;
  icon?: boolean;
};

type ButtonProps = Props & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonRoot: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className: classes,
  variant,
  size,
  disabled,
  icon,
  ...props
}) => {
  const className = classNames({ classes, variant, size, disabled, icon });
  return (
    <button className={className} data-testid="button" {...props}>
      {children}
    </button>
  );
};

type LinkProps = Props & RemixLinkProps;

const LinkButton: React.FC<PropsWithChildren<LinkProps>> = ({
  children,
  variant,
  size,
  disabled,
  className: classes,
  ...props
}) => {
  const className = classNames({ classes, variant, size, disabled });
  return (
    <Link className={className} {...props}>
      {children}
    </Link>
  );
};

type Variants = "primary" | "secondary" | "outlined" | "text";
type Sizes = "sm" | "md" | "lg" | "xl";

function append(base: string, append: string) {
  return base.concat(" ", append);
}

function classNames({
  classes,
  variant = "primary",
  size = "md",
  icon = false,
}: {
  classes?: string;
  variant?: Variants;
  size?: Sizes;
  disabled?: boolean;
  icon?: boolean;
}): string {
  // Base classes
  let buttonStyles = `${
    icon ? "rounded-full" : "rounded-md"
  } transition-all box-border`;
  // Set classes for different variants
  let variantStyles = "";
  switch (variant) {
    case "primary":
      variantStyles = "text-white bg-stone-600 hover:opacity-80";
      break;
    case "secondary":
      variantStyles = "text-stone-700 bg-stone-200 hover:opacity-80";
      break;
    case "outlined":
      variantStyles =
        "bg-inherit text-stone-800 border-stone-400 border hover:bg-stone-200";
      break;
    case "text":
      variantStyles = "hover:bg-stone-200 text-stone-700";
      break;
  }
  buttonStyles = append(buttonStyles, variantStyles);
  // Set classes for different sizes
  let sizeStyles = "";
  switch (size) {
    case "sm":
      sizeStyles = `${icon ? "p-2" : "py-1 px-2"} text-sm`;
      break;
    case "md":
      sizeStyles = `${icon ? "p-3" : "py-2 px-3"} text-sm`;
      break;
    case "lg":
      sizeStyles = `${icon ? "p-4" : "py-2 px-4"}`;
      break;
    case "xl":
      sizeStyles = `${icon ? "p-5" : "py-3 px-5"}`;
      break;
  }
  buttonStyles = append(buttonStyles, sizeStyles);
  if (classes) {
    buttonStyles = buttonStyles.concat(" ", classes);
  }
  return buttonStyles;
}

export const Button = Object.assign(ButtonRoot, { Link: LinkButton });
