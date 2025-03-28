type PaginationResponseProps<Item> = {
  items: Item[]
  itemsCount: number
  pagesCount: number
}

export class PaginationResponse<Item> {
  readonly items: Item[]
  readonly itemsCount: number
  readonly pagesCount: number
  static readonly itemsPerPage: number

  constructor({ items, itemsCount, pagesCount }: PaginationResponseProps<Item>) {
    this.items = items
    this.itemsCount = itemsCount
    this.pagesCount = pagesCount
  }
}
