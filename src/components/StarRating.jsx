const STAR_VALUES = [1, 2, 3, 4, 5];

export default function StarRating({ value, onChange, size = "text-base" }) {
  const interactive = typeof onChange === "function";

  return (
    <div className={`flex items-center gap-0.5 ${size}`} role={interactive ? "radiogroup" : undefined}>
      {STAR_VALUES.map((star) => {
        const filled = star <= value;
        const Tag = interactive ? "button" : "span";
        return (
          <Tag
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => onChange(star) : undefined}
            aria-label={interactive ? `Rate ${star} star${star > 1 ? "s" : ""}` : undefined}
            className={`leading-none ${interactive ? "cursor-pointer" : ""} ${
              filled ? "text-amber-500" : "text-stone-300"
            }`}
          >
            ★
          </Tag>
        );
      })}
    </div>
  );
}
