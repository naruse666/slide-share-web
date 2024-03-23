import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import ButtonWrapper from './components/button-wrapper'

export default function AuthPage() {
  return (
    <main className="h-dvh">
      <article className="pt-10 h-full flex items-center">
        <Card className="p-3 mx-auto">
          <CardHeader>
            <CardTitle className="text-lg text-center">ログイン</CardTitle>
          </CardHeader>
          <ButtonWrapper />
          <CardFooter>
            <Link href="/" className="flex gap-1 justify-center items-center">
              <ArrowLeft className="w-5 h-5" />
              <p>戻る</p>
            </Link>
          </CardFooter>
        </Card>
      </article>
    </main>
  )
}
