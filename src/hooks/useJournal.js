import { useContext } from "react";
import { JournalContext } from "../context/JournalContext";

export function useJournal() {
  const ctx = useContext(JournalContext);
  if (!ctx) {
    throw new Error("useJournal must be used within a JournalProvider");
  }
  return ctx;
}
