"use client";
import { createContext, useContext, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

type ConsentStatus = "pending" | "accepted" | "rejected";

const STORAGE_KEY = "cookie-consent";
const listeners = new Set<() => void>();

function readConsent(): ConsentStatus {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "accepted" || stored === "rejected" ? stored : "pending";
}

function getServerConsent(): ConsentStatus {
  return "pending";
}

function writeConsent(value: ConsentStatus | null) {
  if (value === null) {
    window.localStorage.removeItem(STORAGE_KEY);
  } else {
    window.localStorage.setItem(STORAGE_KEY, value);
  }
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

type CookieConsentContextValue = {
  consent: ConsentStatus;
  accept: () => void;
  reject: () => void;
  resetConsent: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const consent = useSyncExternalStore(subscribe, readConsent, getServerConsent);

  const value: CookieConsentContextValue = {
    consent,
    accept: () => writeConsent("accepted"),
    reject: () => writeConsent("rejected"),
    resetConsent: () => writeConsent(null),
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent debe usarse dentro de CookieConsentProvider");
  }
  return context;
}
