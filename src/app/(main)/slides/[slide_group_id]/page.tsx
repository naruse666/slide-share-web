import React from 'react'

export default function SlideGroupPage({
  params,
}: {
  params: { slide_group_id: string }
}) {
  return (
    <div>
      <p className="font-bold text-lg">
        slide group page: {params.slide_group_id}
      </p>
    </div>
  )
}
