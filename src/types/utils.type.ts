export interface SuccessResponse<Data> {
  message: string
  data: Data
}

export interface ResponseApi<Data> {
  message: string
  data?: Data
}
