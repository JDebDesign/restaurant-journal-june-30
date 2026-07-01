import { Link } from "react-router-dom";
import EntryCard from "./EntryCard";
import EmptyState from "./EmptyState";

export default function EntryList({ entries, hasAnyEntries }) {
  if (entries.length === 0 && !hasAnyEntries) {
    return (
      <EmptyState
        icon="📓"
        title="No entries yet"
        description="Log your first meal so you can give confident recommendations later."
        action={
          <Link
            to="/entry/new"
            className="inline-flex items-center gap-1.5 bg-stone-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-stone-700 transition"
          >
            + Log a visit
          </Link>
        }
      />
    );
  }

  if (entries.length === 0) {
    return (
      <EmptyState
        icon="🔎"
        title="No matching entries"
        description="Try adjusting your search or filters."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
