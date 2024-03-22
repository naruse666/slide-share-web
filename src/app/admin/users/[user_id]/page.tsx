import React from 'react'

export default function AdminUserDetail({
  params,
}: {
  params: { user_id: string }
}) {
  return (
    <div>
      <p className="font-bold text-lg">admin user page: {params.user_id}</p>
    </div>
  )
}
