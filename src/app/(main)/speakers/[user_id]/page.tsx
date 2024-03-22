export default function SpeakerDetailPage({
  params,
}: {
  params: { user_id: string }
}) {
  return (
    <article>
      <p className="font-bold text-lg">speaker detail page: {params.user_id}</p>
    </article>
  )
}
