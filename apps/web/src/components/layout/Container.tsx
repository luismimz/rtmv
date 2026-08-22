import { ReactNode } from "react";

type ContainerPops = {
  children : ReactNode;
  className? : string; 
};

export function Container({children, className ="", } : ContainerPops){
  return <div className={`mx-auto w-full max-w-7xl px-6 ${className}`}>{children}</div>
};