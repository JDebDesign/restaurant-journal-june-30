import { CUISINES } from "../data/mockEntries";

export default function SearchFilterBar({ filters, onChange }) {
  const { query, cuisine, minRating, favoritesOnly } = filters;

  function update(patch) {
    onChange({ ...filters, ...patch });
  }

  return (
    <div className="flex flex-col gap-2.5">
      <input
        type="search"
        value={query}
        onChange={(e) => update({ query: e.target.value })}
        placeholder="Search by restaurant or cuisine..."
        className="w-full rounded-full border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
      />

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={cuisine}
          onChange={(e) => update({ cuisine: e.target.value })}
          className="text-sm border border-stone-300 rounded-full px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-stone-400"
        >
          <option value="">All cuisines</option>
          {CUISINES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={minRating}
          onChange={(e) => update({ minRating: Number(e.target.value) })}
          className="text-sm border border-stone-300 rounded-full px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-stone-400"
        >
          <option value={0}>Any rating</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r}+ stars
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => update({ favoritesOnly: !favoritesOnly })}
          className={`text-sm rounded-full px-3 py-1.5 border transition ${
            favoritesOnly
              ? "bg-amber-50 border-amber-300 text-amber-700"
              : "border-stone-300 text-stone-600 bg-white"
          }`}
        >
          ★ Favorites only
        </button>
      </div>
    </div>
  );
}
