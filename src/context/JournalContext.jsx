import { createContext, useCallback, useEffect, useState } from "react";
import * as journalService from "../data/journalService";

export const JournalContext = createContext(null);

export function JournalProvider({ children }) {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await journalService.listEntries();
      setEntries(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addEntry = useCallback(async (data) => {
    const created = await journalService.createEntry(data);
    setEntries((prev) => [created, ...prev]);
    return created;
  }, []);

  const editEntry = useCallback(async (id, data) => {
    const updated = await journalService.updateEntry(id, data);
    setEntries((prev) => prev.map((e) => (e.id === id ? updated : e)));
    return updated;
  }, []);

  const removeEntry = useCallback(async (id) => {
    await journalService.deleteEntry(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const value = {
    entries,
    isLoading,
    error,
    refresh,
    addEntry,
    editEntry,
    removeEntry,
  };

  return <JournalContext.Provider value={value}>{children}</JournalContext.Provider>;
}
