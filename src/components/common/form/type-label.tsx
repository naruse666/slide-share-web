export default function TypeLabel({ type }: { type: '任意' | '必須' }) {
  return (
    <span
      className={`text-xs py-0.5 px-1 ml-1.5 font-semibold ${type === '必須' ? 'bg-red-500' : 'bg-blue-500'}`}
    >
      {type}
    </span>
  )
}
