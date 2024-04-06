'use client'

import { useEffect, useState } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { convertToEmbedUrl } from '@/utils/convert-embed-url'

export default function IframeView({
  google_slide_share_url,
  drive_pdf_url,
}: {
  google_slide_share_url: string
  drive_pdf_url: string
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1300)
  }, [])

  return (
    <div className="w-full max-w-[920px] aspect-video relative">
      {isLoading && (
        <div className="bg-[#212121] dark:bg-[#313131] absolute z-40 top-0 right-0 w-full h-full py-3">
          <Skeleton className="w-full h-full" />
        </div>
      )}
      {google_slide_share_url ? (
        <iframe
          src={convertToEmbedUrl(google_slide_share_url)}
          className="w-full h-full"
          allowFullScreen={true}
        ></iframe>
      ) : (
        <iframe src={drive_pdf_url} className="w-full h-full"></iframe>
      )}
    </div>
  )
}
