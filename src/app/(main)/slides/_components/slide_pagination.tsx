'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

const items = [{ page: '1' }, { page: '2' }, { page: '3' }]

const Item = ({ page, searchPage }: { page: string; searchPage: string }) => {
  return (
    <PaginationItem>
      <PaginationLink
        href={`slides/?page=${page}`}
        isActive={searchPage === page}
      >
        {page}
      </PaginationLink>
    </PaginationItem>
  )
}

export default function SlidePagination() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchPage = searchParams.get('page')

  useEffect(() => {
    if (!searchPage || !items.some((item) => item.page === searchPage)) {
      router.push('slides/?page=1')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPage])

  return (
    <Pagination>
      <PaginationContent>
        {searchPage !== '1' ? (
          <PaginationItem>
            <PaginationPrevious
              href={`slides/?page=${Number(searchPage) - 1}`}
              className="w-20"
            />
          </PaginationItem>
        ) : (
          <div className="w-20"></div>
        )}
        {items.map((item, index) => (
          <Item key={index} page={item.page} searchPage={searchPage || ''} />
        ))}
        {searchPage !== items[items.length - 1].page ? (
          <PaginationItem>
            <PaginationNext
              href={`slides/?page=${Number(searchPage) + 1}`}
              className="w-20"
            />
          </PaginationItem>
        ) : (
          <div className="w-20"></div>
        )}
      </PaginationContent>
    </Pagination>
  )
}
