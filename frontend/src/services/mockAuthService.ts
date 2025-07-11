import type { User, LoginRequest, LoginResponse, CreateUserRequest, CreateUserResponse } from '../types/auth';

// Mock user database
const users: User[] = [
  {
    id: 'ADMIN001',
    username: 'admin',
    role: 'admin',
    email: 'admin@dsm.com',
    firstName: 'System',
    lastName: 'Administrator',
    isTemporaryPassword: false,
    createdAt: '2025-01-01T00:00:00Z',
    lastLogin: new Date().toISOString(),
  }
];

// Mock passwords storage (in real app, these would be hashed)
const passwords: { [userId: string]: string } = {
  'ADMIN001': 'admin123',
};

// Generate JWT-like token (mock)
const generateToken = (user: User): string => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 hours
  };
  
  // Mock JWT token (base64 encoded payload)
  return 'mock.' + btoa(JSON.stringify(payload)) + '.signature';
};

// Generate random user ID
const generateUserId = (role: string): string => {
  const prefix = role.toUpperCase().substring(0, 3);
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${randomNum}`;
};

// Generate temporary password
const generateTempPassword = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

export const mockLogin = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => u.username === loginRequest.username);
      
      if (!user) {
        reject({ message: 'User not found', status: 404 });
        return;
      }

      const storedPassword = passwords[user.id];
      if (storedPassword !== loginRequest.password) {
        reject({ message: 'Invalid password', status: 401 });
        return;
      }

      const token = generateToken(user);
      
      // Update last login
      user.lastLogin = new Date().toISOString();

      resolve({
        user,
        token,
        needsPasswordChange: user.isTemporaryPassword,
      });
    }, 500); // Simulate network delay
  });
};

export const mockCreateUser = async (createUserRequest: CreateUserRequest): Promise<CreateUserResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if username already exists
      const existingUser = users.find(u => u.username === createUserRequest.username);
      if (existingUser) {
        reject({ message: 'Username already exists', status: 409 });
        return;
      }

      const userId = generateUserId(createUserRequest.role);
      const temporaryPassword = generateTempPassword();

      const newUser: User = {
        id: userId,
        username: createUserRequest.username,
        role: createUserRequest.role,
        email: createUserRequest.email,
        firstName: createUserRequest.firstName,
        lastName: createUserRequest.lastName,
        isTemporaryPassword: true,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      passwords[userId] = temporaryPassword;

      resolve({
        user: newUser,
        temporaryPassword,
      });
    }, 500);
  });
};

export const mockChangePassword = async (userId: string, currentPassword: string, newPassword: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => u.id === userId);
      if (!user) {
        reject({ message: 'User not found', status: 404 });
        return;
      }

      if (passwords[userId] !== currentPassword) {
        reject({ message: 'Current password is incorrect', status: 401 });
        return;
      }

      passwords[userId] = newPassword;
      user.isTemporaryPassword = false;

      resolve();
    }, 500);
  });
};

export const mockGetAllUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...users]);
    }, 300);
  });
};

export const mockDeleteUser = async (userId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        reject({ message: 'User not found', status: 404 });
        return;
      }

      // Don't allow deleting admin
      if (users[userIndex].role === 'admin') {
        reject({ message: 'Cannot delete admin user', status: 403 });
        return;
      }

      users.splice(userIndex, 1);
      delete passwords[userId];

      resolve();
    }, 500);
  });
};
