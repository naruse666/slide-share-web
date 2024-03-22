export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <p>admin</p>
      {children}
    </main>
  )
}
