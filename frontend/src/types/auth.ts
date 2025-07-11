export interface User {
  id: string;
  username: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  email?: string;
  firstName?: string;
  lastName?: string;
  isTemporaryPassword: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
}

export interface CreateUserRequest {
  username: string;
  role: 'teacher' | 'student' | 'parent';
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface CreateUserResponse {
  user: User;
  temporaryPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ApiError {
  message: string;
  status: number;
}
