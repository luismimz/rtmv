"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DatePickerProps = {
  id?: string;
  value: string;
  onChange: (date: string) => void;
  isDateDisabled: (date: string) => boolean;
  hasError?: boolean;
};

const weekdayLabels = ["L", "M", "X", "J", "V", "S", "D"];

function toDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateString(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getMonthGrid(viewedMonth: Date) {
  const year = viewedMonth.getFullYear();
  const month = viewedMonth.getMonth();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    const cellDate = new Date(year, month, index - firstWeekday + 1);
    return { date: cellDate, isCurrentMonth: cellDate.getMonth() === month };
  });
}

function formatMonthLabel(date: Date) {
  const label = new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(date);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function formatSelectedLabel(dateString: string) {
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(parseDateString(dateString));
}

export function DatePicker({ id, value, onChange, isDateDisabled, hasError }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewedMonth, setViewedMonth] = useState(() =>
    value ? parseDateString(value) : new Date(),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  const isViewingCurrentMonth =
    viewedMonth.getFullYear() === today.getFullYear() &&
    viewedMonth.getMonth() === today.getMonth();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  function goToPreviousMonth() {
    setViewedMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1));
  }

  function goToNextMonth() {
    setViewedMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1));
  }

  function selectDate(date: Date) {
    onChange(toDateString(date));
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen((current) => !current)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={`w-full rounded-sm border bg-background px-4 py-3 text-left text-foreground transition-colors
          ${hasError ? "border-red-500" : "border-border focus:border-primary"}`}
      >
        {value ? formatSelectedLabel(value) : "Selecciona una fecha"}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Selecciona una fecha"
          className="absolute z-20 mt-2 w-full min-w-72 rounded-md border border-border bg-background p-4 shadow-lg sm:w-80"
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={goToPreviousMonth}
              disabled={isViewingCurrentMonth}
              aria-label="Mes anterior"
              className="flex size-8 items-center justify-center rounded-sm text-foreground/70 transition-colors hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            <p className="font-serif text-lg font-semibold text-primary">
              {formatMonthLabel(viewedMonth)}
            </p>
            <button
              type="button"
              onClick={goToNextMonth}
              aria-label="Mes siguiente"
              className="flex size-8 items-center justify-center rounded-sm text-foreground/70 transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-foreground/50">
            {weekdayLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {getMonthGrid(viewedMonth).map(({ date, isCurrentMonth }) => {
              const dateString = toDateString(date);
              const disabled = isDateDisabled(dateString);
              const isSelected = value === dateString;
              const isToday = toDateString(today) === dateString;

              return (
                <button
                  key={dateString}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDate(date)}
                  className={`flex aspect-square items-center justify-center rounded-sm text-sm transition-colors
                    ${!isCurrentMonth ? "text-foreground/25" : "text-foreground"}
                    ${isSelected ? "bg-primary text-background font-semibold" : "hover:bg-primary/10"}
                    ${isToday && !isSelected ? "font-semibold text-primary" : ""}
                    ${disabled ? "cursor-not-allowed text-foreground/20 line-through hover:bg-transparent" : "cursor-pointer"}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
