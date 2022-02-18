/* eslint-disable no-await-in-loop */
import request from 'supertest';
import mongoose from 'mongoose';
import app from '@src/app';
import User from '@models/user';
import Organization from '@models/organization';
import Project from '@models/project';
import { beforeEach, expect } from '@jest/globals';

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
// extract seed and add faker package
describe('Listing All Projects', () => {
  const addProjects = async (count) => {
    for (let i = 0; i < count; i += 1) {
      const projectIds = [];
      // replace with register
      const user = await User.create({
        username: `user${i + 1}@email.com`,
        email: `user${i + 1}@email.com`,
        firstName: `fistName${i + 1}`,
        lastName: `lastName${i + 1}`,
      });
      const organization = await Organization.create({
        owner: user._id,
        name: `organization-${i + 1}`,
        city: `city-${i + 1}`,
        country: `country-${i + 1}`,
      });
      const project = await Project.create({
        organizer: organization._id,
        name: `project-${i + 1}`,
        summary: `summary-${i + 1}`,
        category: `category-${i + 1}`,
      });
      projectIds.push(project._id);
    }
  };

  const getProjects = (pageQuery = {}) => {
    let endpoint = '';
    if (pageQuery) {
      console.log('getProjects -> pageQuery', pageQuery);
      const { page, size } = pageQuery;
      endpoint = `/api/v1/projects?page=${page}&size=${size}`;
    } else {
      endpoint = '/api/v1/projects';
    }
    const agent = request(app).get(endpoint);
    return agent;
  };

  it('returns 200 when there are no projects in db', async () => {
    const response = await getProjects();
    expect(response.status).toBe(200);
  });

  /*
   * Pagination
   */

  it('returns pagination object as response body', async () => {
    const response = await getProjects();
    expect(response.body.data).toEqual({
      items: [],
      pageInfo: {},
    });
  });

  it('returns 10 projects in items array when there are 11 projects in db', async () => {
    await addProjects(11);
    const response = await getProjects();
    expect(response.body.data.items.length).toBe(10);
    expect(response.body.data.pageInfo.totalItems).toBe(11);
  });

  it('returns 1 project in items array at page 2 when there are 11 projects in db', async () => {
    await addProjects(11);
    const pageQuery = {
      page: 2,
      size: 10,
    };
    const response = await getProjects(pageQuery);
    expect(response.body.data.items.length).toBe(1);
    expect(response.body.data.pageInfo.totalItems).toBe(11);
  });

  it('returns totalPages as 2 when there are 11 projects in db', async () => {
    await addProjects(11);
    const response = await getProjects();
    expect(response.body.data.pageInfo.totalPages).toBe(2);
  });

  it('returns size as 10 when size is not specified', async () => {
    await addProjects(11);
    const response = await getProjects();
    expect(response.body.data.pageInfo.size).toBe(10);
  });

  it('returns size as 5 when size is specified as 5', async () => {
    await addProjects(11);
    const pageQuery = {
      page: 1,
      size: 5,
    };
    const response = await getProjects(pageQuery);
    expect(response.body.data.pageInfo.size).toBe(5);
  });

  it('returns page as 1 when page is null', async () => {
    await addProjects(11);
    const pageQuery = {
      page: null,
      size: 10,
    };
    const response = await getProjects(pageQuery);
    expect(response.body.data.pageInfo.page).toBe(1);
  });

  it('returns items as empty array when page is greater than totalPages', async () => {
    await addProjects(11);
    const pageQuery = {
      page: 3,
      size: 10,
    };
    const response = await getProjects(pageQuery);
    expect(response.body.data.items.length).toBe(0);
  });
});

/*
 * Image uploads
 */

/*
 * Project List DTO
 */

describe('Filtering Projects', () => {
  it('sanity check', () => {
    expect(1).toBe(1);
  });

  /*
   * Filter by
   */
});

describe('Searching Projects', () => {
  it('sanity check', () => {
    expect(1).toBe(1);
  });
});

// const request = require('supertest');
// const app = require('../src/app');
// const User = require('../src/user/User');
// const Hoax = require('../src/hoax/Hoax');
// const FileAttachment = require('../src/file/FileAttachment');
// const en = require('../locales/en/translation.json');
// const tr = require('../locales/tr/translation.json');

// beforeEach(async () => {
//   await FileAttachment.destroy({ truncate: true });
//   await User.destroy({ truncate: { cascade: true } });
// });

// const addFileAttachment = async (hoaxId) => {
//   await FileAttachment.create({
//     filename: `test-file-for-hoax-${hoaxId}`,
//     fileType: 'image/png',
//     hoaxId: hoaxId,
//   });
// };
// describe('Listing All Hoaxes', () => {
//   const addHoaxes = async (count) => {
//     const hoaxIds = [];
//     for (let i = 0; i < count; i++) {
//       const user = await User.create({
//         username: `user${i + 1}`,
//         email: `user${i + 1}@mail.com`,
//       });
//       const hoax = await Hoax.create({
//         content: `hoax content ${i + 1}`,
//         timestamp: Date.now(),
//         userId: user.id,
//       });
//       hoaxIds.push(hoax.id);
//     }
//     return hoaxIds;
//   };
//   const getHoaxes = () => {
//     const agent = request(app).get('/api/1.0/hoaxes');
//     return agent;
//   };
//   it('returns 200 ok when there are no hoaxes in database', async () => {
//     const response = await getHoaxes();
//     expect(response.status).toBe(200);
//   });
//   it('returns page object as response body', async () => {
//     const response = await getHoaxes();
//     expect(response.body).toEqual({
//       content: [],
//       page: 0,
//       size: 10,
//       totalPages: 0,
//     });
//   });
//   it('returns 10 hoaxes in page content when there are 11 hoaxes in database', async () => {
//     await addHoaxes(11);
//     const response = await getHoaxes();
//     expect(response.body.content.length).toBe(10);
//   });
//   it('returns only id, content, timestamp and user object having id, username, email and image in content array for each hoax', async () => {
//     await addHoaxes(11);
//     const response = await getHoaxes();
//     const hoax = response.body.content[0];
//     const hoaxKeys = Object.keys(hoax);
//     const userKeys = Object.keys(hoax.user);
//     expect(hoaxKeys).toEqual(['id', 'content', 'timestamp', 'user']);
//     expect(userKeys).toEqual(['id', 'username', 'email', 'image']);
//   });

//   it('returns fileAttachment having filename, fileType if hoax has any', async () => {
//     const hoaxIds = await addHoaxes(1);
//     await addFileAttachment(hoaxIds[0]);
//     const response = await getHoaxes();
//     const hoax = response.body.content[0];
//     const hoaxKeys = Object.keys(hoax);
//     expect(hoaxKeys).toEqual([
//       'id',
//       'content',
//       'timestamp',
//       'user',
//       'fileAttachment',
//     ]);
//     const fileAttachmentKeys = Object.keys(hoax.fileAttachment);
//     expect(fileAttachmentKeys).toEqual(['filename', 'fileType']);
//   });

//   it('returns 2 as totalPages when there are 11 hoaxes', async () => {
//     await addHoaxes(11);
//     const response = await getHoaxes();
//     expect(response.body.totalPages).toBe(2);
//   });
//   it('returns second page hoaxes and page indicator when page is set as 1 in request parameter', async () => {
//     await addHoaxes(11);
//     const response = await getHoaxes().query({ page: 1 });
//     expect(response.body.content[0].content).toBe('hoax content 1');
//     expect(response.body.page).toBe(1);
//   });
//   it('returns first page when page is set below zero as request parameter', async () => {
//     await addHoaxes(11);
//     const response = await getHoaxes().query({ page: -5 });
//     expect(response.body.page).toBe(0);
//   });
//   it('returns 5 hoaxes and corresponding size indicator when size is set as 5 in request parameter', async () => {
//     await addHoaxes(11);
//     const response = await getHoaxes().query({ size: 5 });
//     expect(response.body.content.length).toBe(5);
//     expect(response.body.size).toBe(5);
//   });
//   it('returns 10 hoaxes and corresponding size indicator when size is set as 1000', async () => {
//     await addHoaxes(11);
//     const response = await getHoaxes().query({ size: 1000 });
//     expect(response.body.content.length).toBe(10);
//     expect(response.body.size).toBe(10);
//   });
//   it('returns 10 hoaxes and corresponding size indicator when size is set as 0', async () => {
//     await addHoaxes(11);
//     const response = await getHoaxes().query({ size: 0 });
//     expect(response.body.content.length).toBe(10);
//     expect(response.body.size).toBe(10);
//   });
//   it('returns page as zero and size as 10 when non numeric query params provided for both', async () => {
//     await addHoaxes(11);
//     const response = await getHoaxes().query({ size: 'size', page: 'page' });
//     expect(response.body.size).toBe(10);
//     expect(response.body.page).toBe(0);
//   });
//   it('returns hoaxes to be ordered from new to old', async () => {
//     await addHoaxes(11);
//     const response = await getHoaxes();
//     const firstHoax = response.body.content[0];
//     const lastHoax = response.body.content[9];
//     expect(firstHoax.timestamp).toBeGreaterThan(lastHoax.timestamp);
//   });
// });

// describe('Listing Hoaxes of a User', () => {
//   const addUser = async (name = 'user1') => {
//     return await User.create({
//       username: name,
//       email: `${name}@mail.com`,
//     });
//   };
//   const addHoaxes = async (count, userId) => {
//     const hoaxIds = [];
//     for (let i = 0; i < count; i++) {
//       const hoax = await Hoax.create({
//         content: `hoax content ${i + 1}`,
//         timestamp: Date.now(),
//         userId: userId,
//       });
//       hoaxIds.push(hoax.id);
//     }
//     return hoaxIds;
//   };
//   const getHoaxes = (id) => {
//     const agent = request(app).get(`/api/1.0/users/${id}/hoaxes`);
//     return agent;
//   };
//   it('returns 200 ok when there are no hoaxes in database', async () => {
//     const user = await addUser();
//     const response = await getHoaxes(user.id);
//     expect(response.status).toBe(200);
//   });
//   it('returns 404 when user does not exist', async () => {
//     const response = await getHoaxes(5);
//     expect(response.status).toBe(404);
//   });
//   it.each`
//     language | message
//     ${'tr'}  | ${tr.user_not_found}
//     ${'en'}  | ${en.user_not_found}
//   `(
//     'returns error object with $message for unknown user when lagnauge is $language',
//     async ({ language, message }) => {
//       const nowInMillis = Date.now();
//       const response = await getHoaxes(5).set('Accept-Language', language);
//       const error = response.body;
//       expect(error.message).toBe(message);
//       expect(error.path).toBe('/api/1.0/users/5/hoaxes');
//       expect(error.timestamp).toBeGreaterThan(nowInMillis);
//     }
//   );
//   it('returns page object as response body', async () => {
//     const user = await addUser();
//     const response = await getHoaxes(user.id);
//     expect(response.body).toEqual({
//       content: [],
//       page: 0,
//       size: 10,
//       totalPages: 0,
//     });
//   });
//   it('returns 10 hoaxes in page content when there are 11 hoaxes in database', async () => {
//     const user = await addUser();
//     await addHoaxes(11, user.id);
//     const response = await getHoaxes(user.id);
//     expect(response.body.content.length).toBe(10);
//   });
//   it('returns 5 hoaxes belongs to user in page content when there are total 11 hoaxes for two users', async () => {
//     const user = await addUser();
//     await addHoaxes(5, user.id);
//     const user2 = await addUser('user2');
//     await addHoaxes(6, user2.id);
//     const response = await getHoaxes(user.id);
//     expect(response.body.content.length).toBe(5);
//   });
//   it('returns only id, content, timestamp and user object having id, username, email and image in content array for each hoax', async () => {
//     const user = await addUser();
//     await addHoaxes(11, user.id);
//     const response = await getHoaxes(user.id);
//     const hoax = response.body.content[0];
//     const hoaxKeys = Object.keys(hoax);
//     const userKeys = Object.keys(hoax.user);
//     expect(hoaxKeys).toEqual(['id', 'content', 'timestamp', 'user']);
//     expect(userKeys).toEqual(['id', 'username', 'email', 'image']);
//   });
//   it('returns fileAttachment having filename, fileType if hoax has any', async () => {
//     const user = await addUser();
//     const hoaxIds = await addHoaxes(1, user.id);
//     await addFileAttachment(hoaxIds[0]);
//     const response = await getHoaxes(user.id);
//     const hoax = response.body.content[0];
//     const hoaxKeys = Object.keys(hoax);
//     expect(hoaxKeys).toEqual([
//       'id',
//       'content',
//       'timestamp',
//       'user',
//       'fileAttachment',
//     ]);
//     const fileAttachmentKeys = Object.keys(hoax.fileAttachment);
//     expect(fileAttachmentKeys).toEqual(['filename', 'fileType']);
//   });
//   it('returns 2 as totalPages when there are 11 hoaxes', async () => {
//     const user = await addUser();
//     await addHoaxes(11, user.id);
//     const response = await getHoaxes(user.id);
//     expect(response.body.totalPages).toBe(2);
//   });
//   it('returns second page hoaxes and page indicator when page is set as 1 in request parameter', async () => {
//     const user = await addUser();
//     await addHoaxes(11, user.id);
//     const response = await getHoaxes(user.id).query({ page: 1 });
//     expect(response.body.content[0].content).toBe('hoax content 1');
//     expect(response.body.page).toBe(1);
//   });
//   it('returns first page when page is set below zero as request parameter', async () => {
//     const user = await addUser();
//     await addHoaxes(11, user.id);
//     const response = await getHoaxes(user.id).query({ page: -5 });
//     expect(response.body.page).toBe(0);
//   });
//   it('returns 5 hoaxes and corresponding size indicator when size is set as 5 in request parameter', async () => {
//     const user = await addUser();
//     await addHoaxes(11, user.id);
//     const response = await getHoaxes(user.id).query({ size: 5 });
//     expect(response.body.content.length).toBe(5);
//     expect(response.body.size).toBe(5);
//   });
//   it('returns 10 hoaxes and corresponding size indicator when size is set as 1000', async () => {
//     const user = await addUser();
//     await addHoaxes(11, user.id);
//     const response = await getHoaxes(user.id).query({ size: 1000 });
//     expect(response.body.content.length).toBe(10);
//     expect(response.body.size).toBe(10);
//   });
//   it('returns 10 hoaxes and corresponding size indicator when size is set as 0', async () => {
//     const user = await addUser();
//     await addHoaxes(11, user.id);
//     const response = await getHoaxes(user.id).query({ size: 0 });
//     expect(response.body.content.length).toBe(10);
//     expect(response.body.size).toBe(10);
//   });
//   it('returns page as zero and size as 10 when non numeric query params provided for both', async () => {
//     const user = await addUser();
//     await addHoaxes(11, user.id);
//     const response = await getHoaxes(user.id).query({
//       size: 'size',
//       page: 'page',
//     });
//     expect(response.body.size).toBe(10);
//     expect(response.body.page).toBe(0);
//   });
//   it('returns hoaxes to be ordered from new to old', async () => {
//     const user = await addUser();
//     await addHoaxes(11, user.id);
//     const response = await getHoaxes(user.id);
//     const firstHoax = response.body.content[0];
//     const lastHoax = response.body.content[9];
//     expect(firstHoax.timestamp).toBeGreaterThan(lastHoax.timestamp);
//   });
// });
