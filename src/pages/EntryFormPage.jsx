import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useJournal } from "../hooks/useJournal";
import { useEntry } from "../hooks/useEntry";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabaseClient";
import { CUISINES } from "../data/mockEntries";
import StarRating from "../components/StarRating";
import TagInput from "../components/TagInput";
import PhotoPicker from "../components/PhotoPicker";
import DishList from "../components/DishList";

const EMPTY_FORM = {
  restaurantName: "",
  location: "",
  cuisine: CUISINES[0],
  dateVisited: new Date().toISOString().slice(0, 10),
  dishes: [],
  rating: 0,
  notes: "",
  tags: [],
  photos: [],
  isFavoriteRestaurant: false,
};

export default function EntryFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { addEntry, editEntry } = useJournal();
  const { user } = useAuth();
  const { entry, isLoading, notFound } = useEntry(isEditing ? id : null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditing && entry) {
      setForm(entry);
    }
  }, [isEditing, entry]);

  function update(patch) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  if (isEditing && isLoading) {
    return <div className="max-w-2xl mx-auto px-4 py-8 text-stone-400">Loading…</div>;
  }

  if (isEditing && notFound) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-stone-600 mb-4">This entry couldn't be found.</p>
        <Link to="/" className="text-stone-900 font-medium underline">
          Back to journal
        </Link>
      </div>
    );
  }

  async function uploadPendingPhotos(photos) {
    return Promise.all(
      photos.map(async (photo) => {
        if (!photo.file) return photo;
        const path = `${user.id}/${photo.id}-${photo.file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("photos")
          .upload(path, photo.file);
        if (uploadError) throw uploadError;
        const {
          data: { publicUrl },
        } = supabase.storage.from("photos").getPublicUrl(path);
        return { id: photo.id, url: publicUrl };
      })
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.restaurantName.trim()) {
      setError("Restaurant name is required.");
      return;
    }
    setError("");
    setIsSaving(true);
    try {
      const photos = await uploadPendingPhotos(form.photos);
      const payload = { ...form, photos };
      if (isEditing) {
        await editEntry(id, payload);
        navigate(`/entry/${id}`);
      } else {
        const created = await addEntry(payload);
        navigate(`/entry/${created.id}`);
      }
    } catch (err) {
      setError(err.message || "Couldn't save your visit — try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-5 pb-24">
      <Link to={isEditing ? `/entry/${id}` : "/"} className="text-sm text-stone-500 hover:text-stone-700">
        ← Cancel
      </Link>

      <h1 className="text-xl font-bold text-stone-900 mt-2 mb-4">
        {isEditing ? "Edit visit" : "Log a visit"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Restaurant name</label>
          <input
            type="text"
            value={form.restaurantName}
            onChange={(e) => update({ restaurantName: e.target.value })}
            placeholder="e.g. Nonna's Table"
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Cuisine</label>
            <select
              value={form.cuisine}
              onChange={(e) => update({ cuisine: e.target.value })}
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              {CUISINES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Date visited</label>
            <input
              type="date"
              value={form.dateVisited}
              onChange={(e) => update({ dateVisited: e.target.value })}
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => update({ location: e.target.value })}
            placeholder="e.g. Hayes Valley, San Francisco"
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Overall rating</label>
            <StarRating value={form.rating} onChange={(rating) => update({ rating })} size="text-2xl" />
          </div>
          <label className="flex items-center gap-2 text-sm text-stone-600">
            <input
              type="checkbox"
              checked={form.isFavoriteRestaurant}
              onChange={(e) => update({ isFavoriteRestaurant: e.target.checked })}
              className="rounded border-stone-300"
            />
            ★ Favorite
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Dishes</label>
          <DishList dishes={form.dishes} onChange={(dishes) => update({ dishes })} />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Notes / impressions</label>
          <textarea
            value={form.notes}
            onChange={(e) => update({ notes: e.target.value })}
            rows={4}
            placeholder="What stood out? Would you recommend it, and to whom?"
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Tags</label>
          <TagInput tags={form.tags} onChange={(tags) => update({ tags })} />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Photos</label>
          <PhotoPicker photos={form.photos} onChange={(photos) => update({ photos })} />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isSaving}
          className="w-full bg-stone-900 text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-stone-700 transition disabled:opacity-50"
        >
          {isSaving ? "Saving…" : isEditing ? "Save changes" : "Save visit"}
        </button>
      </form>
    </div>
  );
}
