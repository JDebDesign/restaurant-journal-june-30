import { useEffect, useState } from "react";
import * as journalService from "../data/journalService";

export function useEntry(id) {
  const [entry, setEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setNotFound(false);
    journalService.getEntry(id).then((data) => {
      if (cancelled) return;
      if (!data) {
        setNotFound(true);
      } else {
        setEntry(data);
      }
      setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { entry, isLoading, notFound };
}
