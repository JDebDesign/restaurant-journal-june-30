export default function EmptyState({ icon = "🍽️", title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="text-5xl mb-4">{icon}</div>
      <h2 className="text-lg font-semibold text-stone-800 mb-1">{title}</h2>
      {description && <p className="text-stone-500 max-w-sm mb-5">{description}</p>}
      {action}
    </div>
  );
}
