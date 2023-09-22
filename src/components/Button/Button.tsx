import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> 

export const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick}>{children}</button>
  )
}
