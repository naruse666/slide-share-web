import React from 'react'

export default function UploadPage({
  params,
}: {
  params: { slide_group_id: string }
}) {
  return (
    <div>
      <p className="font-bold text-lg">upload page: {params.slide_group_id}</p>
    </div>
  )
}
