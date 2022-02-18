import { expect } from '@jest/globals';
import mongoose from 'mongoose';
import app from '@src/app';
import request from 'supertest';
import User from '@models/user';
import Organization from '@models/organization';

const validOrg = {
  name: 'Valid Organization',
  city: 'Istanbul',
  country: 'Turkey',
};

const registerCreds = {
  email: 'aminait@outlook.com',
  username: 'aminait@outlook.com',
};

const owner = {
  email: 'aminait@outlook.com',
  password: 'Pass123!',
};

const registerOwnerUserAndLogin = async (user = owner, options = {}) => {
  await User.register(registerCreds, owner.password);
  // login request
  const agent = request(app).post('/api/v1/auth/login');
  if (options.language) {
    agent.set('Accept-Language', options.language);
  }
  return agent.send(user);
};

const getOwnerUser = async () => {
  const userList = await User.find();
  console.log('getOwnerUser -> userList', userList);
  return userList[0];
};

const createOrganization = (token = null, org = validOrg, options = {}) => {
  const agent = request(app).post('/api/v1/organizations');
  if (options.language) {
    agent.set('Accept-Language', options.language);
  }
  if (token) {
    agent.set('Authorization', `Bearer ${token}`);
  }
  return agent.send(org);
};

const registerOwnerAndOrganization = async () => {
  const loginRes = await registerOwnerUserAndLogin();
  const { token } = loginRes.body.data;
  await createOrganization(token);
};

beforeEach((done) => {
  mongoose.connect(
    'mongodb://localhost:27017/volunteer-db-test',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

describe('Register as an Organization', () => {
  it('sanity check', () => {
    expect(1).toBe(1);
  });

  it('returns 201 when register request is valid', async () => {
    const loginRes = await registerOwnerUserAndLogin();
    const { token } = loginRes.body.data;
    const regRes = await createOrganization(token);
    expect(regRes.status).toBe(201);
  });

  it('sets isVolunteer flag to false in database', async () => {
    const loginRes = await registerOwnerUserAndLogin();
    const { token } = loginRes.body.data;
    await createOrganization(token);
    const user = await getOwnerUser();
    expect(typeof user.isVolunteer).toBe('boolean');
    expect(user.isVolunteer).toBe(false);
  });

  it('returns 403 if bearer token is null', async () => {
    const regRes = await createOrganization();
    expect(regRes.status).toBe(403);
  });

  it('returns 400 with validation messages if org params are invalid', async () => {
    // TODO add more invalid objects
    const invalidOrg = {
      name: 'Invalid Org',
      country: 4,
      city: null,
    };
    const loginRes = await registerOwnerUserAndLogin();
    const { token } = loginRes.body.data;
    const regRes = await createOrganization(token, invalidOrg);
    expect(regRes.status).toBe(400);
    expect(regRes.body.messages.length).toBeGreaterThanOrEqual(1);
  });

  it('saves organization in db after registeration', async () => {
    await registerOwnerAndOrganization();
    const orgList = await Organization.find();
    expect(orgList.length).toBe(1);
  });

  it('saves owner in organization object', async () => {
    await registerOwnerAndOrganization();
    const orgList = await Organization.find();
    const org = orgList[0];
    console.log('it -> org', org);
    expect(org.owner).toBeTruthy();
  });

  it('matches organization owner field with User ID', async () => {
    await registerOwnerAndOrganization();
    const orgList = await Organization.find();
    const org = orgList[0];
    const user = await getOwnerUser();
    expect(org.owner).toEqual(user._id);
  });
});
