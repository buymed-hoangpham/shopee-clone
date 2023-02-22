import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export const registerAccount = async (body: { email: string; password: string }) =>
  await http.post<AuthResponse>('/register', body)

export const loginAccount = async (body: { email: string; password: string }) =>
  await http.post<AuthResponse>('/login', body)

export const logoutAccount = async () => await http.post<AuthResponse>('/logout')
