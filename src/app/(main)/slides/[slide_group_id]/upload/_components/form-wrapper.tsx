export default function UploadFormWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-primary/10 border w-full max-w-lg rounded-md shadow-md mx-auto p-3">
      {children}
    </div>
  )
}
