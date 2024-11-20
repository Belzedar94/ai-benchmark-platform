import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock services
jest.mock('../../services/auth', () => {
  const originalModule = jest.requireActual('../../services/auth');
  return {
    ...originalModule,
    register: jest.fn(),
    login: jest.fn(),
    verifyToken: jest.fn(),
    isAdmin: jest.fn(),
  };
});

describe('Auth Service', () => {
  let prisma: jest.Mocked<PrismaClient>;

  beforeEach(() => {
    prisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should hash password and create user', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
      };

      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const { register } = require('../../services/auth');
      const result = await register('test@example.com', 'password123', 'Test User');

      expect(result).toEqual(mockUser);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: 'test@example.com',
          name: 'Test User',
          password: expect.any(String),
        }),
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });
    });
  });

  describe('login', () => {
    it('should return null for non-existent user', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const { login } = require('../../services/auth');
      const result = await login('test@example.com', 'password123');

      expect(result).toBeNull();
    });

    it('should return null for invalid password', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
        name: 'Test User',
        role: 'user',
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const { login } = require('../../services/auth');
      const result = await login('test@example.com', 'wrongpassword');

      expect(result).toBeNull();
    });

    it('should return user and token for valid credentials', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
        name: 'Test User',
        role: 'user',
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const { login } = require('../../services/auth');
      const result = await login('test@example.com', 'password123');

      expect(result).toEqual({
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
          role: 'user',
        },
        token: expect.any(String),
      });
    });
  });

  describe('isAdmin', () => {
    it('should return true for admin users', () => {
      const user = {
        id: 1,
        email: 'admin@example.com',
        name: 'Admin',
        role: 'admin',
      };

      const { isAdmin } = require('../../services/auth');
      expect(isAdmin(user)).toBe(true);
    });

    it('should return false for non-admin users', () => {
      const user = {
        id: 1,
        email: 'user@example.com',
        name: 'User',
        role: 'user',
      };

      const { isAdmin } = require('../../services/auth');
      expect(isAdmin(user)).toBe(false);
    });
  });
});