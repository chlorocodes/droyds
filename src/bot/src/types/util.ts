// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string, any>

export type Nullable<T> = T | null

export interface Command {
  id: string
}
