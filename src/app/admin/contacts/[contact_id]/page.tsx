import React from 'react'

export default function AdminContactDetailPage({
  params,
}: {
  params: { contact_id: string }
}) {
  return (
    <div>
      <p className="font-bold text-lg">
        admin contact detail page: {params.contact_id}
      </p>
    </div>
  )
}
