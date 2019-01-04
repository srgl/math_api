declare type pgpConnection = {
  proc: (query: string) => Promise<string>,
  none: (query: string, params: Object) => Promise<void>
}

declare type pgpMain = (config: Object) => pgpConnection

declare type pgPromise = () => pgpMain

declare module 'pg-promise' {
  declare module.exports: pgPromise
}
