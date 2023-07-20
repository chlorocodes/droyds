// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string, any>

export type Nullable<T> = T | null

export interface Alias {
  id: string
  commandId: string
  alias: string
}

export interface Command {
  id: string
  name: string
  response: string
  responseType: string
  aliases: Alias[]
}

export type NormalizedCommands = Record<
  string,
  {
    response: string
    responseType: string
  }
>
