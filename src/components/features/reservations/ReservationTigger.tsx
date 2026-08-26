"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { CalendarDays } from "lucide-react";
import { ReservationModal } from "@/components/features/reservations/ReservationModal";
import { Button } from "@/components/ui/Button";

type ReservationTriggerProps = {
  children?: ReactNode;
  className?: string;
};

export function ReservationTrigger({
  children = "Reservar mesa",
  className = "",
}: ReservationTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        icon={CalendarDays}
        onClick={() => setIsOpen(true)}
        className={className}>
        {children}
      </Button>
      <ReservationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)} />
    </>
  );
}