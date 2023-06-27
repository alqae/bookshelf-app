export interface AuthenticationBody {
  email: string
  password: string
}

export interface AuthenticationResponse {
  token: string
}

export interface AceptInvitationBody {
  token: string
  firstName: string
  lastName: string
  password: string
}

export interface SendInvitationBody {
  email: string
}
