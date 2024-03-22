export default function UploadPage({
  params,
}: {
  params: { slide_group_id: string }
}) {
  return (
    <article>
      \{' '}
      <p className="font-bold text-lg">upload page: {params.slide_group_id}</p>
    </article>
  )
}
