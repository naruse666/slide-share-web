export default function SlideDetailPage({
  params,
}: {
  params: { slide_group_id: string; slide_id: string }
}) {
  return (
    <article>
      <p>
        slide page: {params.slide_group_id}, {params.slide_id}
      </p>
    </article>
  )
}
