import React from 'react'

export default function AdminSlideDetailPage({
  params,
}: {
  params: { slide_group_id: string; slide_id: string }
}) {
  return (
    <div>
      <p className="font-bold text-lg">
        admin slide page: {params.slide_group_id}, {params.slide_id}
      </p>
    </div>
  )
}
