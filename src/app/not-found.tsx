import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'

import CardWrapper from './_components/card-wrapper'

export default function NotFoundPage() {
  return (
    <article className="pt-16 px-5">
      <CardWrapper
        title="ページが存在しません"
        link={{
          href: '/',
          text: 'ホームに戻る',
        }}
      >
        <div className="flex flex-col justify-center items-center gap-6 pt-8 pb-6">
          <p className="text-center text-foreground">
            お探しのページが見つかりませんでした。
          </p>
          <Link href="/" className={buttonVariants()}>
            ホームに戻る
          </Link>
        </div>
      </CardWrapper>
    </article>
  )
}
