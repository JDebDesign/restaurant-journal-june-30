import { Link, useNavigate, useParams } from "react-router-dom";
import { useEntry } from "../hooks/useEntry";
import { useJournal } from "../hooks/useJournal";
import StarRating from "../components/StarRating";

export default function EntryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { entry, isLoading, notFound } = useEntry(id);
  const { removeEntry } = useJournal();

  if (isLoading) {
    return <div className="max-w-2xl mx-auto px-4 py-8 text-stone-400">Loading…</div>;
  }

  if (notFound) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-stone-600 mb-4">This entry couldn't be found.</p>
        <Link to="/" className="text-stone-900 font-medium underline">
          Back to journal
        </Link>
      </div>
    );
  }

  async function handleDelete() {
    if (!window.confirm(`Delete your visit to ${entry.restaurantName}? This can't be undone.`)) {
      return;
    }
    await removeEntry(entry.id);
    navigate("/");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-5 pb-24">
      <Link to="/" className="text-sm text-stone-500 hover:text-stone-700">
        ← Back
      </Link>

      <div className="flex items-start justify-between gap-2 mt-3">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
            {entry.restaurantName}
            {entry.isFavoriteRestaurant && <span className="text-amber-500 text-xl">★</span>}
          </h1>
          <p className="text-stone-500">
            {entry.cuisine} · {entry.location}
          </p>
        </div>
        <StarRating value={entry.rating} size="text-xl" />
      </div>

      <p className="text-sm text-stone-400 mt-1">
        Visited{" "}
        {new Date(entry.dateVisited).toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      {entry.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {entry.tags.map((tag) => (
            <span key={tag} className="text-xs bg-stone-100 text-stone-600 rounded-full px-2.5 py-1">
              {tag}
            </span>
          ))}
        </div>
      )}

      {entry.photos?.length > 0 && (
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {entry.photos.map((photo) => (
            <img
              key={photo.id}
              src={photo.url}
              alt=""
              className="w-32 h-32 rounded-lg object-cover shrink-0"
            />
          ))}
        </div>
      )}

      {entry.notes && (
        <div className="mt-5">
          <h2 className="text-sm font-semibold text-stone-700 mb-1">Notes</h2>
          <p className="text-stone-600 whitespace-pre-wrap">{entry.notes}</p>
        </div>
      )}

      {entry.dishes?.length > 0 && (
        <div className="mt-5">
          <h2 className="text-sm font-semibold text-stone-700 mb-2">Dishes</h2>
          <ul className="space-y-2">
            {entry.dishes.map((dish) => (
              <li key={dish.id} className="border border-stone-200 rounded-lg p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-stone-900">{dish.name}</span>
                  {dish.wouldReorder && (
                    <span className="text-xs bg-green-50 text-green-700 rounded-full px-2 py-0.5 shrink-0">
                      Would reorder
                    </span>
                  )}
                </div>
                {dish.notes && <p className="text-sm text-stone-500 mt-1">{dish.notes}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-2 mt-6">
        <Link
          to={`/entry/${entry.id}/edit`}
          className="flex-1 text-center bg-stone-900 text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-stone-700 transition"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className="text-center border border-red-200 text-red-600 text-sm font-medium px-4 py-2.5 rounded-full hover:bg-red-50 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
