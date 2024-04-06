import Image from 'next/image'

export default function Loading() {
  return (
    <div className="flex h-dvh justify-center items-center opacity-80">
      <div>
        <Image
          src="/lt.png"
          alt="LTサークル"
          width={100}
          height={100}
          className="rounded-md"
        />
        <p className="text-center font-semibold mt-4">ロード中...</p>
      </div>
    </div>
  )
}
