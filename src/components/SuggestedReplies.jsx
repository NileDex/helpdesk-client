export default function SuggestedReplies({ suggestions, onSelect }) {
  if (!suggestions || suggestions.length === 0) return null
  return (
    <div className="flex flex-wrap gap-1.5 px-3.5 py-2 border-t border-gray-100">
      {suggestions.map((s, i) => (
        <button
          key={i}
          onClick={() => onSelect(s)}
          className="bg-indigo-50 text-indigo-500 border border-indigo-200 rounded-full px-3 py-1 text-[11.5px] font-medium hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all whitespace-nowrap"
        >
          {s}
        </button>
      ))}
    </div>
  )
}
