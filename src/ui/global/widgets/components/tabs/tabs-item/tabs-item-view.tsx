type Props = {
  children: string
}

export const TabsTitleView = ({ children }: Props) => {
  return (
    <div className='flex items-center space-x-2 text-sm'>
      <span>{children}</span>
    </div>
  )
}
