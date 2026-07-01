import { Link } from "react-router-dom";
import StarRating from "./StarRating";

export default function EntryCard({ entry }) {
  const thumbnail = entry.photos?.[0]?.url;

  return (
    <Link
      to={`/entry/${entry.id}`}
      className="flex gap-3 bg-white rounded-xl border border-stone-200 p-3 hover:border-stone-300 hover:shadow-sm transition"
    >
      <div className="w-20 h-20 shrink-0 rounded-lg bg-stone-100 overflow-hidden flex items-center justify-center text-2xl">
        {thumbnail ? (
          <img src={thumbnail} alt="" className="w-full h-full object-cover" />
        ) : (
          <span aria-hidden="true">🍴</span>
        )}
      </div>

      <div className="min-w-0 flex-1 text-left">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-stone-900 truncate">{entry.restaurantName}</h3>
          {entry.isFavoriteRestaurant && (
            <span aria-label="Favorite" title="Favorite" className="text-amber-500 shrink-0">
              ★
            </span>
          )}
        </div>
        <p className="text-sm text-stone-500 truncate">
          {entry.cuisine} · {entry.location}
        </p>
        <div className="flex items-center justify-between mt-1.5">
          <StarRating value={entry.rating} size="text-sm" />
          <span className="text-xs text-stone-400">
            {new Date(entry.dateVisited).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        {entry.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {entry.tags.map((tag) => (
              <span key={tag} className="text-xs bg-stone-100 text-stone-600 rounded-full px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
