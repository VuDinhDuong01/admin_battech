import axios, { AxiosError } from 'axios'
import { UNPROCESSABLE_ENTITY, UNAUTHORIZED } from 'http-status-codes';
export const isAxiosError = (error: unknown): error is AxiosError => {
  return error instanceof axios.AxiosError;
}

export const UNPROCESSABLEENTITYError = (error: unknown): error is AxiosError => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return isAxiosError(error) && (error as any)?.response.status === UNPROCESSABLE_ENTITY
}
export const UNAUTHORIZEDError = (error: unknown): error is AxiosError => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return isAxiosError(error) && (error as any)?.response.status === UNAUTHORIZED 
}

export const UNAUTHORIZEDErrorToken = (error: unknown): error is AxiosError => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return isAxiosError(error) && (error as any)?.response.status === UNAUTHORIZED && (error as any)?.response.data.message ==="expired"
}

