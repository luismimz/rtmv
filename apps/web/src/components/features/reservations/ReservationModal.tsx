"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import { CancelSquareIcon, Restaurant01Icon } from "@hugeicons/core-free-icons";
import { ReservationFlow } from "@/components/features/reservations/ReservationFlow";

type ReservationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ReservationModal({ 
  isOpen, 
  onClose }: ReservationModalProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-primary/80 backdrop-blur-sm"
    role="dialog" aria-modal="true" aria-labelledby="reservation-modal-title">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-background shadow-2xl">
        <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <HugeiconsIcon icon={Restaurant01Icon} size={20} strokeWidth={1.7}/>
            </div>
            <div>
            <h2
             className="font-serif text-2xl font-semibold text-primary leading-none"
              id="reservation-modal-title">
             Reservar mesa
            </h2>
            <p className="mt-1 text-sm text-foreground/60">
            Tía María · Vallecas
            </p>
          </div>
          </div>
          <button
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-sm bg-muted text-foreground/60 transition-colors hover:bg-primary/10 hover:text-primary"
            aria-label="Cerrar reserva">
            <HugeiconsIcon icon={CancelSquareIcon} size={26} strokeWidth={1.7}/>
          </button>
        </div>
        <div className="overflow-y-auto p-6 sm:p-8">
          <ReservationFlow/>
        </div>
      </div>
    </div>
  );
}