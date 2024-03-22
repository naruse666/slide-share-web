import React from 'react'

export default function AdminSlideGroupPage({
  params,
}: {
  params: { slide_group_id: string }
}) {
  return (
    <div>
      <p className="font-bold text-lg">
        admin slide group page: {params.slide_group_id}
      </p>
    </div>
  )
}
