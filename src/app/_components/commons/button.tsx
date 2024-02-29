import { ReactNode } from "react";

interface ButtonProps {
  type: "submit" | "reset" | "button";
  value: string | ReactNode;
  disabled?: boolean;
}
const Button = ({ type = "submit", value, disabled }: ButtonProps) => {
  return (
    <button
      className="flex h-8 min-w-16 items-center justify-center rounded bg-stone-300 px-2 py-1 transition-colors hover:bg-stone-400 disabled:text-gray-500"
      type={type}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Button;
