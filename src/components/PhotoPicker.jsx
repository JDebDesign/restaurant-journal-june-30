import { useRef } from "react";
import { makeId } from "../data/mockEntries";

export default function PhotoPicker({ photos, onChange }) {
  const inputRef = useRef(null);

  function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    const newPhotos = files.map((file) => ({
      id: makeId("photo"),
      url: URL.createObjectURL(file),
      file,
    }));
    onChange([...photos, ...newPhotos]);
    e.target.value = "";
  }

  function removePhoto(id) {
    const photo = photos.find((p) => p.id === id);
    if (photo?.file) URL.revokeObjectURL(photo.url);
    onChange(photos.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {photos.map((photo) => (
          <div key={photo.id} className="relative w-20 h-20 rounded-lg overflow-hidden bg-stone-100">
            <img src={photo.url} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removePhoto(photo.id)}
              aria-label="Remove photo"
              className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full w-5 h-5 text-xs leading-none flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-20 h-20 rounded-lg border-2 border-dashed border-stone-300 text-stone-400 text-2xl flex items-center justify-center hover:border-stone-400 hover:text-stone-500 transition"
          aria-label="Add photo"
        >
          +
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className="hidden"
      />
      <p className="text-xs text-stone-400">Photos upload when you save this visit.</p>
    </div>
  );
}
