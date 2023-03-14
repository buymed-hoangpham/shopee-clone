export interface SuccessResponse<Data> {
  message: string
  data: Data
}

export interface ResponseApi<Data> {
  message: string
  data?: Data
}

// cú pháp '-?' loại bỏ undefined của key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
