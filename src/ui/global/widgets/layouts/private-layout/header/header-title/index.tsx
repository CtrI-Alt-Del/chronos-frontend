'use client'

import { useHeaderTitle } from './use-header-title'

export function HeaderTitle() {
  const { pageTitle } = useHeaderTitle()

  return <h1 className='text-2xl font-extrabold text-black'>{pageTitle}</h1>
}
