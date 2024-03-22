import React from 'react'

export default function SlideDetailPage({
  params,
}: {
  params: { slide_group_id: string; slide_id: string }
}) {
  return (
    <div>
      <p className="font-bold text-lg">
        slide page: {params.slide_group_id}, {params.slide_id}
      </p>
    </div>
  )
}
