import type {ReactNode} from "react";  
import Link from "next/link";
import {LucideIcon } from "lucide-react";
type ButtonProps = {
  className?: string;
  children : ReactNode;
  href?: string;
  onClick?: ()=> void;
  type?: "button" | "submit" | "reset";
  icon?: LucideIcon;
  disabled?: boolean;
};
 export function Button({children, className="",href, onClick, type="button", icon: Icon, disabled}:ButtonProps){
  if (href){
    return (
      <Link href={href} className={`inline-flex items-center gap-2 ${className}`} onClick={onClick} >
      {Icon && <Icon size={22} strokeWidth={2} />}
      {children}
      </Link>
    );
    }
    return (
      <button 
      className={`inline-flex items-center gap-2 ${className}`} 
      onClick={onClick} 
      type={type} 
      disabled={disabled}>
        {Icon && <Icon size={22} strokeWidth={2} />}
        {children}
      </button>
    );
 }