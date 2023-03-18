import sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import { GROUP_DELETED, GROUP_UPDATED } from '../constants';
import { GroupService } from '../../services/group';
import { GroupController } from '../controllers/group';

describe('Group controller', () => {
  const groupServiceStub = sinon.createStubInstance(GroupService);
  const groupController = new GroupController(groupServiceStub);

  // Mock the Request and Response objects
  const req = {} as Request;
  const resStatus = { json: sinon.stub() };
  const res = { sendStatus: sinon.stub(), status: sinon.stub().returns(resStatus) } as unknown as Response;
  const next: NextFunction = jest.fn();

  afterEach(() => {
    groupServiceStub.deleteGroup.reset();
    groupServiceStub.getGroupById.reset();
    groupServiceStub.getGroups.reset();
  });

  afterAll(() => {
    sinon.restore();
  });

  describe('addUserToGroup', () => {
    req.params = { groupId: '3' };
    req.body = { userIds: ['1', '2'] };

    afterEach(() => {
      groupServiceStub.addUsersToGroup.reset();
    });

    afterAll(() => {
      req.params = {};
    });

    it('sends a 400 response on error', async () => {
      // Mock the addUsersToGroup method to reject with an error.
      groupServiceStub.addUsersToGroup.rejects(new Error('Unable to get user'));

      await groupController.addUserToGroup(req, res);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(resStatus.json, { error: 'Unable to get user' });
    });

    it('calls addUsersToGroup on the GroupService with the correct arguments', async () => {
      await groupController.addUserToGroup(req, res);

      sinon.assert.calledWith(groupServiceStub.addUsersToGroup, req.params.groupId, req.body.userIds);
      sinon.assert.calledWith(res.sendStatus, 200);
    });
  });

  describe('createGroup', () => {
    it('calls createGroup on the GroupService with the correct arguments', async () => {
      req.params = { id: '1' };
      req.body = { name: 'group-name' };
      await groupController.createGroup(req, res, next);

      sinon.assert.calledWith(groupServiceStub.createGroup, req.params.id, req.body);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(resStatus.json, GROUP_UPDATED);
    });
  });

  describe('deleteGroup', () => {
    it('calls deleteGroup on the GroupService with the correct arguments', async () => {
      groupServiceStub.deleteGroup.resolves(true);

      req.params = { id: '1' };
      await groupController.deleteGroup(req, res, next);

      sinon.assert.calledWith(groupServiceStub.deleteGroup, req.params.id);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(resStatus.json, GROUP_DELETED);
    });
  });

  describe('getGroupById', () => {
    it('calls getGroupById on the GroupService with the correct arguments', async () => {
      groupServiceStub.getGroupById.resolves({ id: 1, name: 'Admin', permissions: [] });

      req.params = { id: '1' };
      await groupController.getGroupById(req, res, next);

      sinon.assert.calledWith(groupServiceStub.getGroupById, req.params.id);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(resStatus.json, { id: 1, name: 'Admin', permissions: [] });
    });
  });

  describe('getGroups', () => {
    it('calls getGroups on the GroupService with the correct status', async () => {
      const GROUPS = [
        { id: 1, name: 'Admin', permissions: [] },
        { id: 2, name: 'Guest', permissions: [] },
      ];
      groupServiceStub.getGroups.resolves(GROUPS);

      await groupController.getGroups(req, res, next);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(resStatus.json, GROUPS);
    });
  });
});
