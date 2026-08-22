import {ReactNode} from "react";
type SectionProps = {
  children : ReactNode;
  className? : string;
  id? : string;
};

export function Section({children, className="",id} : SectionProps){
  return <section className={`py-20 ${className}`} id={id}>{children}</section>
}
