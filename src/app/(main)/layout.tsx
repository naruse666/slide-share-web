export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <p>main</p>
      {children}
    </main>
  )
}
