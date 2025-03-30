export type NextParams<Data extends string> = {
  params: {
    [key in Data]: string
  }
}
