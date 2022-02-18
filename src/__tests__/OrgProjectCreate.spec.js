import { expect } from '@jest/globals';
import mongoose from 'mongoose';
import app from '@src/app';
import request from 'supertest';
import User from '@models/user';
import Organization from '@models/organization';

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

const createUserAndOrganization = async () => {
  const regCreds = {
    email: 'aminait@outlook.com',
    username: 'aminait@outlook.com',
  };
  const password = 'Pass123!';
  const user = await User.register(regCreds, password);
  console.log('createOrganization -> user', user);

  const org = {
    owner: user._id,
    name: 'Test Org',
    city: 'City',
    country: 'Country',
    organizers: [user._id],
  };

  const organization = await Organization.create(org);
  return organization;
};

const sampleProj = {
  name: 'Test Project',
  summary: 'Summary',
  category: "It's a category",
  capacity: 90,
};

const invalidProj = {
  summary: 'Summary',
  category: null,
  capacity: 90,
};

const createOrganizationProject = (
  organizationId,
  token = null,
  project = sampleProj,
  options = {}
) => {
  const agent = request(app).post(`/api/v1/organizations/${organizationId}/projects`);
  if (options.language) {
    agent.set('Accept-Language', options.language);
  }
  if (token) {
    agent.set('Authorization', `Bearer ${token}`);
  }
  return agent.send(project);
};

const login = async (options = {}) => {
  const user = {
    email: 'aminait@outlook.com',
    password: 'Pass123!',
  };
  // login request
  const agent = request(app).post('/api/v1/auth/login');
  if (options.language) {
    agent.set('Accept-Language', options.language);
  }
  return agent.send(user);
};

describe('Create Organization Project', () => {
  it('returns 201 when organization creates a project', async () => {
    const organization = await createUserAndOrganization();
    const loginRes = await login();
    const { token } = loginRes.body.data;
    const response = await createOrganizationProject(organization._id, token);
    expect(response.status).toBe(201);
  });

  it('returns 403 when organization creates a project unauthenticated', async () => {
    const organization = await createUserAndOrganization();
    const response = await createOrganizationProject(organization._id);
    expect(response.status).toBe(403);
  });

  it('returns organization object after creation', async () => {
    const organization = await createUserAndOrganization();
    const loginRes = await login();
    const { token } = loginRes.body.data;
    const response = await createOrganizationProject(organization._id, token);
    expect(typeof response.body.data === 'object').toBe(true);
    // TODO check object better
    expect(Object.keys(response.body.data)[0]).toBe('organization');
  });

  // TODO make test better
  it('returns 400 and validation messages if request is invalid', async () => {
    const organization = await createUserAndOrganization();
    const loginRes = await login();
    const { token } = loginRes.body.data;
    const response = await createOrganizationProject(organization._id, token, invalidProj);
    expect(response.body.messages.length).toBeGreaterThanOrEqual(1);
  });

  it('returns 404 when non-existing organization ID', async () => {
    await createUserAndOrganization();
    const loginRes = await login();
    const { token } = loginRes.body.data;
    const response = await createOrganizationProject(
      '620fd7060f92c3e35bf10210',
      token,
      invalidProj
    );
    expect(response.status).toBe(404);
  });

  // TODO add test case for invalid ID
});

// describe('Create Recurring Organization Project');
