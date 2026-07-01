import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useJournal } from "../hooks/useJournal";
import { useAuth } from "../hooks/useAuth";
import SearchFilterBar from "../components/SearchFilterBar";
import EntryList from "../components/EntryList";

const DEFAULT_FILTERS = { query: "", cuisine: "", minRating: 0, favoritesOnly: false };

export default function JournalListPage() {
  const { entries, isLoading } = useJournal();
  const { signOut } = useAuth();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const filteredEntries = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return entries.filter((entry) => {
      if (q) {
        const haystack = `${entry.restaurantName} ${entry.cuisine}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.cuisine && entry.cuisine !== filters.cuisine) return false;
      if (filters.minRating && entry.rating < filters.minRating) return false;
      if (filters.favoritesOnly && !entry.isFavoriteRestaurant) return false;
      return true;
    });
  }, [entries, filters]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-5 pb-24">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-stone-900">Your Journal</h1>
        <div className="flex items-center gap-2">
          <Link
            to="/entry/new"
            className="inline-flex items-center gap-1 bg-stone-900 text-white text-sm font-medium px-3.5 py-2 rounded-full hover:bg-stone-700 transition"
          >
            + Log visit
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="text-sm text-stone-500 hover:text-stone-700 px-2 py-2"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="mb-4">
        <SearchFilterBar filters={filters} onChange={setFilters} />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-stone-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <EntryList entries={filteredEntries} hasAnyEntries={entries.length > 0} />
      )}
    </div>
  );
}
