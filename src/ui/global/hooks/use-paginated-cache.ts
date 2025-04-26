'use client'

import useSWRInfinite from 'swr/infinite'
import { useMemo, useState } from 'react'

import { PaginationResponse } from '@/@core/global/responses'
import { useToast } from './use-toast'
import { useQueryParamNumber } from './use-query-param-number'

type PaginatedCacheConfig<CacheItem> = {
  key: string
  fetcher: (page: number) => Promise<PaginationResponse<CacheItem>>
  itemsPerPage?: number
  dependencies?: unknown[]
  isEnabled?: boolean
  fallbackData?: CacheItem[]
  refreshInterval?: number
  isInfinity?: boolean
  shouldRefetchOnFocus?: boolean
}

type PaginatedCache<CacheItem> = {
  data: CacheItem[]
  isFetching: boolean
  isRefetching: boolean
  isRecheadedEnd: boolean
  itemsCount: number
  pagesCount: number
  page: number
  refetch: () => void
  nextPage: () => void
  setPage: (page: number) => void
}

export function usePaginatedCache<CacheItem>({
  key,
  fetcher,
  itemsPerPage = PaginationResponse.itemsPerPage,
  isEnabled = true,
  fallbackData,
  isInfinity = false,
  shouldRefetchOnFocus = true,
  refreshInterval = 0,
  dependencies,
}: PaginatedCacheConfig<CacheItem>): PaginatedCache<CacheItem> {
  const [itemsCount, setItemsCount] = useState(0)
  const [pagesCount, setPagesCount] = useState(0)
  const [page, setPageQueryParam] = useQueryParamNumber('page', 1)
  const toast = useToast()
  dependencies?.push(page)
  const dependenciesQuery = dependencies
    ? dependencies.map((dependency, index) => `dep_${index + 1}=${dependency}`).join(',')
    : ''

  function getKey(pageIndex: number) {
    if (!isEnabled) {
      return null
    }
    return `${key}?${dependenciesQuery}&itemsPerPage=${itemsPerPage}&page=${pageIndex + 1}`
  }

  async function infiniteFetcher() {
    const response = await fetcher(page)
    setItemsCount(response.itemsCount)
    setPagesCount(response.pagesCount)
    return response.items
  }

  const { data, isLoading, isValidating, size, setSize, mutate } = useSWRInfinite(
    getKey,
    infiniteFetcher,
    {
      revalidateOnFocus: shouldRefetchOnFocus,
      refreshInterval: refreshInterval,
      fallbackData: fallbackData ? [fallbackData] : [],
      onError: (error) => {
        toast.showError(error)
      },
    },
  )

  function setPage(page: number) {
    setSize(page)
    setPageQueryParam(page)
  }

  function nextPage() {
    setSize(size + 1)
    setPageQueryParam(size + 1)
  }

  const items = useMemo(() => {
    if (data) return isInfinity ? data.flat() : data.at(-1) ?? []
    return []
  }, [data, isInfinity])

  return {
    data: items,
    isRecheadedEnd: data ? Number(data[size - 1]?.length) < itemsPerPage : false,
    isFetching: isLoading,
    isRefetching: isValidating,
    itemsCount,
    pagesCount,
    page: size,
    refetch: () => mutate(),
    nextPage,
    setPage,
  }
}
