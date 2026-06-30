const URL_REGEX = /(https?:\/\/[^\s]+)/

function formatPart(part, i) {
  if (part.startsWith('**') && part.endsWith('**')) {
    return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
  }
  if (part.startsWith('http')) {
    const clean = part.replace(/[.,;:)]$/, '')
    const trail = part.slice(clean.length)
    return (
      <span key={i}>
        <a
          href={clean}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 underline underline-offset-2 hover:text-indigo-700 break-all"
        >
          {clean}
        </a>
        {trail}
      </span>
    )
  }
  return part
}

function formatLine(line) {
  const parts = line.split(/(https?:\/\/[^\s]+|\*\*[^*]+\*\*)/)
  return parts.map((part, i) => formatPart(part, i))
}

export default function MessageContent({ text }) {
  const lines = text.split('\n')
  return (
    <div className="space-y-0.5">
      {lines.map((line, i) =>
        line.trim() === ''
          ? <br key={i} />
          : <p key={i} className="leading-relaxed">{formatLine(line)}</p>
      )}
    </div>
  )
}
