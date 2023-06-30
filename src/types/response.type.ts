export interface IResponse<T> {
  status: number
  message: string
  data: T
}

export interface IResponseError {
  message: string
  throwable: Object
  httpStatus: number
  timestamp: string
}
