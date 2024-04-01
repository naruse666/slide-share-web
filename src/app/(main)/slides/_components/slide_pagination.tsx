import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

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

export default function SlidePagination({
  pageNumber,
  currentPage,
}: {
  pageNumber: number
  currentPage: string
}) {
  return (
    <Pagination>
      <PaginationContent>
        {currentPage !== '1' ? (
          <PaginationItem>
            <PaginationPrevious
              href={`slides/?page=${Number(currentPage) - 1}`}
              className="w-20"
            />
          </PaginationItem>
        ) : (
          <div className="w-20"></div>
        )}
        {Array.from({ length: pageNumber }, (_, index) => (
          <Item
            key={index}
            page={`${index + 1}`}
            searchPage={currentPage || ''}
          />
        ))}
        {currentPage !== `${pageNumber}` ? (
          <PaginationItem>
            <PaginationNext
              href={`slides/?page=${Number(currentPage) + 1}`}
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
