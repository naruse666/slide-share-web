export default function SlideGroupPage({
  params,
}: {
  params: { slide_group_id: string }
}) {
  return (
    <article>
      <p className="font-bold text-lg">
        slide group page: {params.slide_group_id}
      </p>
    </article>
  )
}
