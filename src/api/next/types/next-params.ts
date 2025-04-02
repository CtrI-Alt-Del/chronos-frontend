export type NextParams<Data extends string> = {
  params: Promise<{
    [key in Data]: string
  }>
}
