import axios from 'axios';
import type {
  LoginRequest,
  LoginResponse,
  CreateUserRequest,
  CreateUserResponse,
  ChangePasswordRequest,
  ApiError,
} from '../types/auth';

const API_URL = 'http://localhost:5001/api';

export const login = async (
  loginRequest: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/auth/login`,
      loginRequest
    );
    return response.data;
  } catch (error: any) {
    const apiError: ApiError = {
      message: error.response?.data?.message || 'Error during login',
      status: error.response?.status || 500,
    };
    throw apiError;
  }
};

export const createUser = async (
  createUserRequest: CreateUserRequest,
  token: string
): Promise<CreateUserResponse> => {
  try {
    const response = await axios.post<CreateUserResponse>(
      `${API_URL}/auth/create-user`,
      createUserRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    // If token is invalid, clear auth data
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/login';
    }
    const apiError: ApiError = {
      message: error.response?.data?.message || 'Error creating user',
      status: error.response?.status || 500,
    };
    throw apiError;
  }
};

export const changePassword = async (
  changePasswordRequest: ChangePasswordRequest,
  token: string
): Promise<void> => {
  try {
    await axios.patch(
      `${API_URL}/auth/change-password`,
      changePasswordRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    const apiError: ApiError = {
      message: error.response?.data?.message || 'Error changing password',
      status: error.response?.status || 500,
    };
    throw apiError;
  }
};

export const getAllUsers = async (token: string): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/auth/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const apiError: ApiError = {
      message: error.response?.data?.message || 'Error fetching users',
      status: error.response?.status || 500,
    };
    throw apiError;
  }
};

export const deleteUser = async (userId: string, token: string): Promise<void> => {
  try {
    await axios.delete(
      `${API_URL}/auth/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    const apiError: ApiError = {
      message: error.response?.data?.message || 'Error deleting user',
      status: error.response?.status || 500,
    };
    throw apiError;
  }
};
