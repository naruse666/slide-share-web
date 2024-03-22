import BreadcrumbNav from '@/components/common/breadcrumb-nav'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="p-4">
      <BreadcrumbNav />
      {children}
    </main>
  )
}
