import React from 'react'

export default function SpeakerDetailPage({
  params,
}: {
  params: { user_id: string }
}) {
  return (
    <div>
      <p className="font-bold text-lg">speaker detail page: {params.user_id}</p>
    </div>
  )
}
