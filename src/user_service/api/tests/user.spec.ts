import { NextFunction, Request, Response } from 'express';
import { User } from '../../models/user';
import { USER_DELETED, USER_UPDATED } from '../constants';
import userController from '../controllers/user';

// Mock the Request and Response objects
const req = {} as Request;
const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
const next: NextFunction = jest.fn();

// Mock the User model
jest.mock('../../models/user', () => ({
  User: {
    destroy: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findOrCreate: jest.fn(),
  },
}));

describe('User controller', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('returns an array of users', async () => {
      const usersData = [{ id: 1, age: 18, login: 'login', password: 'password' }];
      User.findAll.mockResolvedValueOnce(usersData);

      await userController.getUsers(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(usersData);
    });
    it('returns an empty array if there are no users', async () => {
      User.findAll.mockResolvedValueOnce([]);

      await userController.getUsers(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });
    it('returns an error if findAll fails', async () => {
      const error = new Error('Database error');
      User.findAll.mockRejectedValueOnce(error);

      await userController.getUsers(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getUserById', () => {
    it('returns a user object', async () => {
      const user = { id: 1, age: 18, login: 'login', password: 'password' };
      User.findOne.mockResolvedValueOnce(user);

      req.params = { id: '1' };
      await userController.getUserById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it('returns an error if .findOne() fails', async () => {
      const error = new Error('Database error');
      User.findOne.mockRejectedValueOnce(error);

      req.params = { id: '1' };
      await userController.getUserById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('createUser', () => {
    it('adds a user to the database', async () => {
      const newUser = { age: 18, login: 'login', password: 'password' };
      const createdUser = [null, { id: 1, ...newUser }];
      User.findOrCreate.mockResolvedValueOnce(createdUser);

      req.params.id = '1';
      req.body = newUser;
      await userController.createUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(USER_UPDATED);
    });

    it('returns an error if create fails', async () => {
      const error = new Error('Database error');
      User.findOrCreate.mockRejectedValueOnce(error);

      req.body = { name: 'John Doe', email: 'johndoe@example.com' };
      await userController.createUser(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteUser', () => {
    it('deletes a user', async () => {
      User.destroy.mockResolvedValueOnce(true);

      req.params = { id: '1' };
      await userController.deleteUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(USER_DELETED);
    });

    it('returns an error if destroy fails', async () => {
      const error = new Error('Database error');
      User.destroy.mockRejectedValueOnce(error);

      await userController.deleteUser(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
