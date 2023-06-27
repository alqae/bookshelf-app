export interface ResetPasswordBody {
  password: string
  token: string
}

export interface ForgotPasswordBody {
  email: string
}
