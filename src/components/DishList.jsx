import { makeId } from "../data/mockEntries";

export default function DishList({ dishes, onChange }) {
  function addDish() {
    onChange([...dishes, { id: makeId("dish"), name: "", notes: "", wouldReorder: false }]);
  }

  function updateDish(id, patch) {
    onChange(dishes.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  }

  function removeDish(id) {
    onChange(dishes.filter((d) => d.id !== id));
  }

  return (
    <div className="space-y-3">
      {dishes.map((dish) => (
        <div key={dish.id} className="border border-stone-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <input
              type="text"
              value={dish.name}
              onChange={(e) => updateDish(dish.id, { name: e.target.value })}
              placeholder="Dish name"
              className="flex-1 rounded-lg border border-stone-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
            <button
              type="button"
              onClick={() => removeDish(dish.id)}
              aria-label={`Remove ${dish.name || "dish"}`}
              className="text-stone-400 hover:text-red-500 px-1.5"
            >
              ×
            </button>
          </div>
          <textarea
            value={dish.notes}
            onChange={(e) => updateDish(dish.id, { notes: e.target.value })}
            placeholder="Notes on this dish..."
            rows={2}
            className="w-full mt-2 rounded-lg border border-stone-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          <label className="flex items-center gap-2 mt-2 text-sm text-stone-600">
            <input
              type="checkbox"
              checked={dish.wouldReorder}
              onChange={(e) => updateDish(dish.id, { wouldReorder: e.target.checked })}
              className="rounded border-stone-300"
            />
            Would order again
          </label>
        </div>
      ))}
      <button
        type="button"
        onClick={addDish}
        className="text-sm font-medium text-stone-700 border border-stone-300 rounded-full px-3 py-1.5 hover:bg-stone-50 transition"
      >
        + Add dish
      </button>
    </div>
  );
}
